import path from 'node:path';
import fs from 'node:fs';
import { buildPlan, gitProof, LAYERS, resolveModules } from './engine.js';
import { applyTransaction, hasInterruptedTransaction, restoreInterrupted } from './transaction.js';
import { knowledgeTransfers } from './knowledge.js';
import { stageAgentPackets } from './packets.js';

const descriptions = {
  compact: { core: 'Agent workflow and shared tooling', parallel: 'Parallel slice execution', quality: 'Review and QA skills', extras: 'Optional Ponytail utilities' },
  wide: { core: 'Agent workflow, configuration, provider packets, and shared tooling', parallel: 'Parallel slice execution and resource coordination', quality: 'Deep review, verification, and QA skills', extras: 'Optional Ponytail utilities' },
};
const statusBox = (value, width = 15) => { const label = statusLabel(value); return `[${label}]${' '.repeat(Math.max(1, width - label.length - 2))}`; };
const labels = { add: 'ADD', update: 'UPDATE', claim: 'ADOPT', replace: 'REPLACE', remove: 'REMOVE', preserve: 'PRESERVE', 'no-change': 'NO CHANGE', conflict: 'CONFLICT', modified: 'MODIFIED' };
const statusLabel = (value) => value.toUpperCase();
const line = (value, width) => { if (value.length <= width) return [value]; const result = []; for (let start = 0; start < value.length; start += width) result.push(value.slice(start, start + width)); return result; };

export function parseModuleSelection(input) {
  if (typeof input !== 'string' || !input.trim()) return null;
  const values = input.split(',').map((item) => item.trim()); if (!values.every((item) => /^[1-4]$/.test(item))) return null;
  const indexes = [...new Set(values.map(Number))]; return LAYERS.filter((_, index) => indexes.includes(index + 1));
}

export function renderPlan(plan, width = 80) {
  const lines = [`Plan for ${plan.target}`, ''];
  if (width >= 100) lines.push('  ACTION     MODULE      PATH');
  for (const action of plan.actions || []) {
    const modules = (action.modules || []).join(', ');
    const label = labels[action.kind] || action.kind;
    if (width >= 100) {
      lines.push(...line(`  ${label.padEnd(10)} ${modules.padEnd(10)} ${action.path}${action.reason ? ` (${action.reason})` : ''}`, width));
    } else {
      lines.push(...line(`  ${label.padEnd(9)} ${action.path}`, width));
      lines.push(...line(`            ${action.reason ? `module: ${modules}; ${action.reason}` : `module: ${modules}`}`, width));
    }
  }
  if (plan.unresolved?.length) lines.push('', `Unresolved conflicts: ${plan.unresolved.length}`, 'Resolve every conflict before final confirmation.');
  return lines.join('\n');
}

const outputOf = (write) => (value) => { if (write) write(value); };
async function ask(input, write, prompt) { outputOf(write)(prompt); const answer = await input(prompt); return answer == null ? null : String(answer); }
const yes = (answer) => answer !== null && /^y(?:es)?$/i.test(answer.trim());

export async function runInstallWizard({ targetRoot = process.cwd(), sourceRoot, input = async () => null, write = console.log, width = Number(process.stdout.columns) || 80, color = !process.env.NO_COLOR, planner = buildPlan, transaction = applyTransaction, requireGit = false } = {}) {
  const root = path.resolve(targetRoot); const print = outputOf(write);
  if (requireGit) { try { gitProof(root); } catch (error) { print(`[ERROR] ${error.message}\nNo files changed.`); return { code: 1, error }; } }
  if (hasInterruptedTransaction(root)) {
    const answer = await ask(input, write, 'A previous installation was interrupted. Restore its recorded backup before continuing. Restore now? (y/N): ');
    if (!yes(answer)) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; }
    try { restoreInterrupted({ targetRoot: root }); } catch (error) { print(`[ERROR] ${error.message}\nNo files changed.`); return { code: 1, error }; }
  }
  print('\nWorkflow Spec-Driven Installer'); print(`Target: ${root}\n`); print('Select modules to install or update:');
  const wide = width >= 100;
  const assessment = planner({ sourceRoot, targetRoot: root, selectedModules: LAYERS }).plan.assessments;
  assessment.forEach((module, index) => print(`  ${index + 1}. [ ] ${module.id.padEnd(9)} ${statusBox(module.status, wide ? 17 : 16)}${descriptions[wide ? 'wide' : 'compact'][module.id]}`));
  let selected; while (!selected) { const answer = await ask(input, write, '\nModules [1-4, comma-separated]: '); if (answer === null) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; } selected = parseModuleSelection(answer); if (!selected) print('Choose one or more modules using numbers 1-4.'); }
  const plannedModules = resolveModules(selected); print('\nSelected modules:'); for (const module of plannedModules) { const source = assessment.find((item) => item.id === module); const required = plannedModules.filter((item) => item !== module && (module === 'core' && ['parallel', 'quality', 'extras'].includes(item))).join(', '); print(`  [x] ${module.padEnd(9)} ${statusBox(source?.status || 'not installed', wide ? 17 : 16)}${required ? `required by ${required}` : ''}`); }
  const preview = await ask(input, write, '\nContinue to preview? (y/N): '); if (!yes(preview)) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; }
  let built = planner({ sourceRoot, targetRoot: root, selectedModules: selected }); if (built.plan.message) { print(built.plan.message); print('No backup required.'); return { plan: built.plan, code: 0 }; }
  print(`\n${renderPlan(built.plan, width)}`);
  const replacements = []; const excluded = new Set();
  while (built.plan.unresolved?.length) {
    const conflict = built.plan.unresolved[0]; const action = built.plan.actions.find((item) => item.path === conflict); const dependents = (action?.modules || []).flatMap((module) => plannedModules.filter((candidate) => candidate !== module && DEPENDENCIES[candidate]?.includes(module))).filter((item, index, list) => list.indexOf(item) === index);
    print(`\nConflict 1 of ${built.plan.unresolved.length}`); print(`This file contains content not owned by the installer: ${conflict}`); print(`Module: ${(action?.modules || []).join(', ')}`);
    print('\nChoose an action:\n  1. Back up and replace\n     Adds a pending transfer from the backup to\n     docs/product/AGENT-CONTEXT.md.\n  2. Exclude module');
    if (dependents.length) print(`     Excluding ${(action?.modules || []).join(', ')} also excludes: ${dependents.join(', ')}.`);
    print('  3. Cancel installation');
    const choice = await ask(input, write, '\nDecision [1-3]: ');
    if (choice === null || choice.trim() === '3' || !['1', '2'].includes(choice.trim())) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; }
    if (choice.trim() === '1') { replacements.push(conflict); print('AGENTS.md will be backed up and replaced.'); if (knowledgeDestination(conflict)) print('Pending knowledge transfers: 1'); }
    else { for (const module of action?.modules || []) excluded.add(module); if (excluded.has('core')) ['parallel', 'quality', 'extras'].forEach((module) => excluded.add(module)); const cascade = [...excluded].filter((module) => module !== (action?.modules || [])[0]); print(`Excluding ${[...excluded].join(', ')}${cascade.length ? `; also excludes: ${cascade.join(', ')}` : ''}; recalculating plan.`); }
    const modulesAfter = plannedModules.filter((module) => !excluded.has(module)); if (!modulesAfter.length) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; }
    built = planner({ sourceRoot, targetRoot: root, selectedModules: modulesAfter }); for (const item of built.plan.actions) if (replacements.includes(item.path)) item.kind = 'replace'; built.plan.unresolved = built.plan.unresolved.filter((item) => !replacements.includes(item));
  }
  print(`\n${renderPlan(built.plan, width)}`);
  const actions = built.plan.actions.filter((item) => !['preserve', 'no-change'].includes(item.kind)); const counts = Object.fromEntries(Object.keys(labels).map((key) => [key, built.plan.actions.filter((item) => item.kind === key).length])); const summary = Object.entries(counts).filter(([, count]) => count).map(([key, count]) => `${count} ${labels[key].toLowerCase()}`).join(', ') || 'none'; const knowledgeCount = built.plan.actions.filter((item) => ['replace', 'remove'].includes(item.kind) && knowledgeDestination(item.path)).length; print('\nReady to install'); print(`Selected modules: ${built.plan.selectedModules.join(', ')}`); print(`Actions: ${summary}`); print(`Backup: ${actions.some((item) => ['replace', 'remove', 'update'].includes(item.kind)) ? '.my-workflow/backups/<UTC timestamp>/' : 'No backup required.'}`); print(`Knowledge transfers: ${knowledgeCount} pending`);
  const confirmation = await ask(input, write, '\nApply this plan? (y/N): '); if (!yes(confirmation)) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; }
  const packageRoot = sourceRoot || path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
  Object.assign(built.staged, stageAgentPackets(packageRoot, root));
  const knowledgeActions = built.plan.actions.filter((item) => ['replace', 'remove'].includes(item.kind) && item.path.split(':')[0] in { 'AGENTS.md': 1, 'CLAUDE.md': 1, 'knowledge/AGENTS.md': 1, 'knowledge/raw/README.md': 1 });
  const prepared = { targetRoot: root, plan: built.plan, staged: built.staged, knowledgeActions }; for (const action of built.plan.actions.filter((item) => item.kind === 'replace')) { const relative = action.path.split(':')[0]; if (!prepared.staged[relative]) prepared.staged[relative] = fs.readFileSync(path.join(packageRoot, relative)); }
  print('\nApplying... files'); let result; try { result = transaction(prepared); } catch (error) { const publication = /publication failed; previous repository state was restored/.test(error.message); if (publication) print('[ERROR] Installation failed. The previous repository state was restored.'); else if (/backup failed:/.test(error.message)) print(`[ERROR] Backup failed: ${error.message.slice(error.message.indexOf(':') + 1).trim()}`); else print(`[ERROR] ${error.message}`); if (!publication) print('No target files or adoption state changed.'); return { code: 1, error }; } print('Applying... adoption state'); const items = knowledgeTransfers(built.plan, result); print('\nInstallation complete.'); print(`Modules: ${built.plan.selectedModules.join(', ')}`); print(`Actions: ${summary}`); print(`Backup: ${result.backup || 'No backup required.'}`); if (items.length) { print('\nKnowledge transfer required:'); items.forEach((item) => print(`  Source: ${item.source}\n  Destination: ${item.destination}\n  Reason: ${item.reason}\n  Status: ${item.status}`)); print(`Checklist: ${result.backup}/knowledge-transfer.md`); } return { plan: built.plan, result, knowledge: items, code: 0 };
}

const DEPENDENCIES = { core: [], parallel: ['core'], quality: ['core'], extras: ['core'] };
const knowledgeDestination = (relative) => ['AGENTS.md', 'CLAUDE.md', 'knowledge/AGENTS.md', 'knowledge/raw/README.md'].includes(relative?.split(':')[0]);

export default { runInstallWizard, renderPlan, parseModuleSelection };
