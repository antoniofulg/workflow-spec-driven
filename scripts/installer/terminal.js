import path from 'node:path';
import fs from 'node:fs';
import { buildPlan, gitProof, LAYERS, resolveModules } from './engine.js';
import { applyTransaction, hasInterruptedTransaction, restoreInterrupted } from './transaction.js';
import { knowledgeTransfers } from './knowledge.js';
import { stageAgentPackets } from './packets.js';

const descriptions = { core: 'Agent workflow and shared tooling', parallel: 'Parallel slice execution', quality: 'Review and QA skills', extras: 'Optional Ponytail utilities' };
const labels = { add: 'ADD', update: 'UPDATE', claim: 'ADOPT', replace: 'REPLACE', remove: 'REMOVE', preserve: 'PRESERVE', 'no-change': 'NO CHANGE', conflict: 'CONFLICT' };
const statusLabel = (value) => value.toUpperCase();
const line = (value, width) => { if (value.length <= width) return [value]; const result = []; for (let start = 0; start < value.length; start += width) result.push(value.slice(start, start + width)); return result; };

export function parseModuleSelection(input) {
  if (typeof input !== 'string' || !input.trim()) return null;
  const values = input.split(',').map((item) => item.trim()); if (!values.every((item) => /^[1-4]$/.test(item))) return null;
  const indexes = [...new Set(values.map(Number))]; return LAYERS.filter((_, index) => indexes.includes(index + 1));
}

export function renderPlan(plan, width = 80) {
  const lines = [`Plan for ${plan.target}`, ''];
  for (const action of plan.actions || []) { const modules = (action.modules || []).join(', '); const prefix = `  ${(labels[action.kind] || action.kind).padEnd(9)} `; const suffix = action.reason ? `module: ${modules}; ${action.reason}` : `module: ${modules}`; lines.push(...line(`${prefix}${action.path}`, width), ...line(`            ${suffix}`, width)); }
  if (plan.unresolved?.length) lines.push('', `Unresolved conflicts: ${plan.unresolved.length}`, 'Resolve every conflict before final confirmation.');
  return lines.join('\n');
}

const outputOf = (write) => (value) => { if (write) write(value); };
async function ask(input, write, prompt) { outputOf(write)(prompt); const answer = await input(prompt); return answer == null ? null : String(answer); }
const yes = (answer) => answer !== null && /^y(?:es)?$/i.test(answer.trim());

export async function runInstallWizard({ targetRoot = process.cwd(), sourceRoot, input = async () => null, write = console.log, width = Number(process.stdout.columns) || 80, color = !process.env.NO_COLOR, planner = buildPlan, transaction = applyTransaction, requireGit = false } = {}) {
  const root = path.resolve(targetRoot); const print = outputOf(write);
  if (requireGit) { try { gitProof(root); } catch (error) { print(`[ERROR] ${error.message}\nNo files changed.`); return { code: 1, error }; } }
  if (hasInterruptedTransaction(root)) { const answer = await ask(input, write, 'An interrupted installation was found. Restore it before continuing? (y/N): '); if (!yes(answer)) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; } try { restoreInterrupted({ targetRoot: root }); } catch (error) { print(`[ERROR] ${error.message}\nNo files changed.`); return { code: 1, error }; } }
  print('\nWorkflow Spec-Driven Installer'); print(`Target: ${root}\n`); print('Select modules to install or update:');
  const assessment = planner({ sourceRoot, targetRoot: root, selectedModules: LAYERS }).plan.assessments; assessment.forEach((module, index) => print(`  ${index + 1}. [ ] ${module.id.padEnd(9)} [${statusLabel(module.status).padEnd(14)}] ${descriptions[module.id]}`));
  let selected; while (!selected) { const answer = await ask(input, write, '\nModules [1-4, comma-separated]: '); if (answer === null) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; } selected = parseModuleSelection(answer); if (!selected) print('Choose one or more modules using numbers 1-4.'); }
  const plannedModules = resolveModules(selected); print('\nSelected modules:'); for (const module of plannedModules) { const source = assessment.find((item) => item.id === module); const required = plannedModules.filter((item) => item !== module && (module === 'core' && ['parallel', 'quality', 'extras'].includes(item))).join(', '); print(`  [x] ${module.padEnd(9)} [${statusLabel(source?.status || 'not installed').padEnd(14)}]${required ? ` required by ${required}` : ''}`); }
  const preview = await ask(input, write, '\nContinue to preview? (y/N): '); if (!yes(preview)) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; }
  let built = planner({ sourceRoot, targetRoot: root, selectedModules: selected }); if (built.plan.message) { print(built.plan.message); print('No backup required.'); return { plan: built.plan, code: 0 }; }
  print(`\n${renderPlan(built.plan, width)}`);
  const replacements = []; const excluded = new Set();
  while (built.plan.unresolved?.length) { const conflict = built.plan.unresolved[0]; const action = built.plan.actions.find((item) => item.path === conflict); print(`\nConflict 1 of ${built.plan.unresolved.length}`); print(`This file contains content not owned by the installer: ${conflict}`); print(`Module: ${(action?.modules || []).join(', ')}`); print('\nChoose an action:\n  1. Back up and replace\n  2. Exclude module\n  3. Cancel installation'); const choice = await ask(input, write, '\nDecision [1-3]: '); if (choice === null || choice.trim() === '3' || !['1', '2'].includes(choice.trim())) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; } if (choice.trim() === '1') replacements.push(conflict); else { for (const module of action?.modules || []) excluded.add(module); if (excluded.has('core')) ['parallel', 'quality', 'extras'].forEach((module) => excluded.add(module)); print(`Excluding ${[...excluded].join(', ')}; recalculating plan.`); } const modulesAfter = plannedModules.filter((module) => !excluded.has(module)); built = planner({ sourceRoot, targetRoot: root, selectedModules: modulesAfter }); for (const item of built.plan.actions) if (replacements.includes(item.path)) item.kind = 'replace'; built.plan.unresolved = built.plan.unresolved.filter((item) => !replacements.includes(item)); print(`\n${renderPlan(built.plan, width)}`); }
  const actions = built.plan.actions.filter((item) => !['preserve', 'no-change'].includes(item.kind)); const counts = Object.fromEntries(Object.keys(labels).map((key) => [key, actions.filter((item) => item.kind === key).length])); print('\nReady to install'); print(`Selected modules: ${built.plan.selectedModules.join(', ')}`); print(`Actions: ${Object.entries(counts).filter(([, count]) => count).map(([key, count]) => `${count} ${labels[key].toLowerCase()}`).join(', ') || 'none'}`);
  const confirmation = await ask(input, write, '\nApply this plan? (y/N): '); if (!yes(confirmation)) { print('Installation cancelled. No files changed.'); return { cancelled: true, code: 0 }; }
  const packageRoot = sourceRoot || path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
  Object.assign(built.staged, stageAgentPackets(packageRoot, root));
  const knowledgeActions = built.plan.actions.filter((item) => ['replace', 'remove'].includes(item.kind) && item.path.split(':')[0] in { 'AGENTS.md': 1, 'CLAUDE.md': 1, 'knowledge/AGENTS.md': 1, 'knowledge/raw/README.md': 1 });
  const prepared = { targetRoot: root, plan: built.plan, staged: built.staged, knowledgeActions }; for (const action of built.plan.actions.filter((item) => item.kind === 'replace')) prepared.staged[action.path.split(':')[0]] = fs.readFileSync(path.join(packageRoot, action.path.split(':')[0]));
  let result; try { result = transaction(prepared); } catch (error) { print(`[ERROR] ${error.message}`); return { code: 1, error }; } const items = knowledgeTransfers(built.plan, result); print('\nInstallation complete.'); print(`Modules: ${built.plan.selectedModules.join(', ')}`); print(`Actions: ${Object.entries(counts).filter(([, count]) => count).map(([key, count]) => `${count} ${labels[key].toLowerCase()}`).join(', ') || 'none'}`); print(`Backup: ${result.backup || 'No backup required.'}`); if (items.length) { print('\nKnowledge transfer required:'); items.forEach((item) => print(`  Source: ${item.source}\n  Destination: ${item.destination}\n  Reason: ${item.reason}\n  Status: ${item.status}`)); print(`Checklist: ${result.backup}/knowledge-transfer.md`); } return { plan: built.plan, result, knowledge: items, code: 0 };
}

export default { runInstallWizard, renderPlan, parseModuleSelection };
