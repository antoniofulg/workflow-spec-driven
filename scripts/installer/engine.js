import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const WORKFLOW_VERSION = '0.10.0';
export const LAYERS = ['core', 'parallel', 'quality', 'extras'];
export const DEPENDENCIES = { core: [], parallel: ['core'], quality: ['core'], extras: ['core'] };
export const BLOCK_LAYERS = ['core', 'parallel', 'quality'];
export const WORKFLOW_GITIGNORE_ENTRIES = ['.my-workflow.toml', '.claude/agents/', '.codex/agents/', '.cursor/agents/', '!.deep-review/', '.deep-review/*', '!.deep-review/learnings.md', 'graft/'];
export const LEGACY_WORKFLOW_GITIGNORE_ENTRIES = ['.specs/features/'];
export const WORKFLOW_SEARCHIGNORE_ENTRIES = ['!graft/', 'graft/.cache/', 'graft/.graph/'];
export const RUNTIME_PATHS = ['claude', 'codex', 'cursor'].flatMap((provider) => ['planner', 'implementer', 'verifier', 'explorer', 'deep-reviewer', 'designer'].map((role) => `.${provider}/agents/${role}.${provider === 'codex' ? 'toml' : 'md'}`));
export const KNOWLEDGE_DESTINATIONS = {
  'AGENTS.md': { destination: 'docs/product/AGENT-CONTEXT.md', reason: 'Consumer-authored instructions require manual review.' },
  'CLAUDE.md': { destination: 'docs/product/AGENT-CONTEXT.md', reason: 'Consumer-authored instructions require manual review.' },
  'knowledge/AGENTS.md': { destination: 'knowledge/wiki/index.md', reason: 'Consumer-authored knowledge requires manual review.' },
  'knowledge/raw/README.md': { destination: 'knowledge/wiki/research/index.md', reason: 'Consumer-authored knowledge requires manual review.' },
};

export const LAYER_PATHS = {
  core: ['docs/guidelines', 'docs/workflow/README.md', 'docs/workflow/decisions.md', 'docs/workflow/guidelines.md', 'docs/workflow/loop.md', 'docs/workflow/purpose.md', 'docs/workflow/reviews.md', 'knowledge/AGENTS.md', 'knowledge/raw/README.md', '.agents/skills/workflow-spec-driven', '.agents/skills/ponytail', '.agents/skills/workflow-config', '.agents/skills/knowledge-check', '.agents/skills/wspecify', '.agents/skills/wdesign', '.agents/skills/wtasks', '.agents/skills/wimplement', '.agents/skills/wverify', '.agents/skills/wreview', '.agents/skills/wqa'],
  parallel: ['.agents/skills/autonomous'],
  quality: ['.agents/skills/deep-review', '.agents/skills/qa-plan', '.agents/skills/qa-execute'],
  extras: ['.agents/skills/ponytail-audit', '.agents/skills/ponytail-debt', '.agents/skills/ponytail-gain', '.agents/skills/ponytail-help', '.agents/skills/ponytail-review'],
};
export const LAYER_MISSING_PATHS = { core: ['.my-workflow.toml.example'], parallel: [], quality: [], extras: [] };
export const CONSUMER_MISSING_SOURCES = {
  'docs/product/AGENT-CONTEXT.md': 'templates/adoption/product/AGENT-CONTEXT.md',
  'knowledge/wiki/index.md': 'templates/adoption/knowledge/wiki/index.md',
  'knowledge/wiki/log.md': 'templates/adoption/knowledge/wiki/log.md',
  ...Object.fromEntries(['domain', 'product', 'architecture', 'design', 'decisions', 'research', 'open-questions'].map((group) => [`knowledge/wiki/${group}/index.md`, `templates/adoption/knowledge/wiki/${group}/index.md`])),
};
export const RETIRABLE_WORKFLOW_DIRS = ['.agents/skills/workflow-spec-driven/', '.agents/skills/workflow-config/', '.agents/skills/wspecify/', '.agents/skills/wdesign/', '.agents/skills/wtasks/', '.agents/skills/wimplement/', '.agents/skills/wverify/', '.agents/skills/wreview/', '.agents/skills/wqa/', '.agents/skills/ponytail/', '.agents/skills/autonomous/', '.agents/skills/deep-review/', '.agents/skills/qa-plan/', '.agents/skills/qa-execute/', '.agents/skills/ponytail-audit/', '.agents/skills/ponytail-debt/', '.agents/skills/ponytail-gain/', '.agents/skills/ponytail-help/', '.agents/skills/ponytail-review/', 'docs/guidelines/', 'docs/workflow/', 'templates/agents/', 'templates/adoption/agents/', 'tools/knowledge/src/', 'tools/shared/src/'];
export const RETIRABLE_WORKFLOW_FILES = ['tools/ad-index.py', 'tools/orca_assisted_probe.py', 'tools/qa_parallel_pilot.py', 'tools/resource_lock.py'];

export class InstallerError extends Error {}
const fail = (message) => { throw new InstallerError(message); };
const asRoot = (root) => path.resolve(root);
const posix = (value) => value.split(path.sep).join('/');
export const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

export function validateRelative(relative) {
  if (typeof relative !== 'string' || !relative || path.posix.isAbsolute(relative) || relative.split('/').some((part) => !part || part === '.' || part === '..') || posix(relative) !== relative) fail(`manifest path is unsafe: ${relative}`);
  return relative;
}

export function safePath(root, relative, label = 'path') {
  validateRelative(relative);
  const base = asRoot(root);
  const target = path.join(base, ...relative.split('/'));
  let current = base;
  for (const part of relative.split('/')) {
    current = path.join(current, part);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) fail(`${label} ${relative} uses symlink ${posix(path.relative(base, current))}`);
    if (current !== target && fs.existsSync(current) && !fs.lstatSync(current).isDirectory()) fail(`${label} parent ${posix(path.relative(base, current))} must be a directory`);
  }
  if (fs.existsSync(target) && !fs.lstatSync(target).isFile()) fail(`${label} ${relative} must be a file`);
  return target;
}

function sourceFiles(root, relative) {
  const source = path.join(root, ...relative.split('/'));
  if (!fs.existsSync(source)) fail(`workflow source is missing: ${relative}`);
  const stat = fs.lstatSync(source);
  if (stat.isSymbolicLink()) fail(`workflow source is a symlink: ${relative}`);
  if (stat.isFile()) return [relative];
  const result = [];
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name === '__pycache__' || entry.name.endsWith('.pyc')) continue;
      const full = path.join(directory, entry.name);
      const rel = posix(path.relative(root, full));
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) walk(full); else if (entry.isFile()) result.push(rel);
    }
  };
  walk(source);
  return result;
}

export function resolveModules(values) {
  const raw = Array.isArray(values) ? values : String(values).split(',');
  const selected = new Set(raw.map((item) => String(item).trim()).filter(Boolean));
  if (selected.has('full')) { selected.delete('full'); LAYERS.forEach((item) => selected.add(item)); }
  const unknown = [...selected].filter((item) => !LAYERS.includes(item));
  if (unknown.length) fail(`unknown module(s): ${unknown.sort().join(', ')}`);
  if (!selected.size) fail('select at least one module');
  let changed = true;
  while (changed) { changed = false; for (const module of [...selected]) for (const dependency of DEPENDENCIES[module]) if (!selected.has(dependency)) { selected.add(dependency); changed = true; } }
  return LAYERS.filter((module) => selected.has(module));
}

export function requestedModules(values) {
  const raw = Array.isArray(values) ? values : String(values).split(',');
  const selected = new Set(raw.map((item) => String(item).trim()).filter(Boolean));
  if (!selected.size || [...selected].some((item) => item !== 'full' && !LAYERS.includes(item)) || (selected.has('full') && selected.size > 1)) fail('modules must be core, parallel, quality, extras, or full');
  return selected.has('full') ? [...LAYERS] : LAYERS.filter((module) => selected.has(module));
}

function catalog(root, modules) {
  const entries = new Map();
  for (const module of modules) for (const item of [...LAYER_PATHS[module], ...LAYER_MISSING_PATHS[module]]) for (const relative of sourceFiles(root, item)) {
    const prior = entries.get(relative); if (prior && prior !== module) fail(`workflow path belongs to multiple modules: ${relative}`); entries.set(relative, module);
  }
  if (modules.includes('core')) for (const [destination, source] of Object.entries(CONSUMER_MISSING_SOURCES)) { sourceFiles(root, source); entries.set(destination, 'core'); }
  return entries;
}

function adoptedBytes(relative, source) { return relative === 'docs/workflow/README.md' ? Buffer.from(source.toString().split(/(?<=\n)/).filter((line) => !line.includes('(pack.md)')).join('')) : source; }

function emptyManifest() { return { schema: 1, workflow_version: WORKFLOW_VERSION, layers: [], files: {}, blocks: {} }; }
function validHash(value, label, allowNull = false) { if (allowNull && value === null) return; if (typeof value !== 'string' || !/^[0-9a-f]{64}$/.test(value)) fail(`manifest ${label} must be a lowercase SHA-256 hash`); }
export function loadManifest(root) {
  const target = path.join(asRoot(root), '.my-workflow/adoption.json');
  if (!fs.existsSync(target)) return emptyManifest();
  safePath(root, '.my-workflow/adoption.json', 'manifest');
  let data; try { data = JSON.parse(fs.readFileSync(target, 'utf8')); } catch (error) { fail(`invalid adoption manifest: ${error.message}`); }
  if (!data || typeof data !== 'object' || Array.isArray(data) || Object.keys(data).sort().join() !== 'blocks,files,layers,schema,workflow_version') fail('adoption manifest has an unsupported schema');
  if (data.schema !== 1 || typeof data.workflow_version !== 'string' || !/^\d+\.\d+\.\d+$/.test(data.workflow_version) || data.workflow_version.split('.').some((part) => part.length > 9) || data.workflow_version.split('.').map(Number).some(Number.isNaN)) fail('adoption manifest schema must be version 1');
  if (!Array.isArray(data.layers) || data.layers.some((module) => !LAYERS.includes(module)) || data.layers.join() !== [...new Set(data.layers)].sort((a, b) => LAYERS.indexOf(a) - LAYERS.indexOf(b)).join()) fail('manifest layers must be unique and catalog-ordered');
  if (data.layers.length && JSON.stringify(resolveModules(data.layers)) !== JSON.stringify(data.layers)) fail('manifest layers must include every fixed dependency');
  if (!data.files || typeof data.files !== 'object' || Array.isArray(data.files) || !data.blocks || typeof data.blocks !== 'object' || Array.isArray(data.blocks)) fail('manifest files and blocks must be objects');
  for (const [relative, record] of Object.entries(data.files)) {
    validateRelative(relative); if (!record || typeof record !== 'object' || Object.keys(record).sort().join() !== 'installed_sha256,layer,ownership,source_sha256') fail(`manifest file record is invalid: ${relative}`);
    if (!LAYERS.includes(record.layer) || !['managed', 'consumer'].includes(record.ownership)) fail(`manifest file record has invalid ownership/layer: ${relative}`);
    validHash(record.source_sha256, `source_sha256 for ${relative}`); validHash(record.installed_sha256, `installed_sha256 for ${relative}`, record.ownership === 'consumer');
  }
  for (const [key, record] of Object.entries(data.blocks)) { const [relative, module] = key.split(/:(?=[^:]+$)/); validateRelative(relative); if (!['AGENTS.md', 'CLAUDE.md'].includes(relative) || !BLOCK_LAYERS.includes(module) || (relative === 'CLAUDE.md' && module !== 'core') || !record || Object.keys(record).join() !== 'sha256') fail(`manifest block record is invalid: ${key}`); validHash(record.sha256, `block ${key}`); }
  return data;
}

function record(module, ownership, source, installed) { return { layer: module, ownership, source_sha256: sha256(source), installed_sha256: installed === null ? null : sha256(installed) }; }
function isProvider(relative) { return relative.startsWith('.agents/skills/workflow-config/assets/agents/'); }
function isRetirable(relative) { return RETIRABLE_WORKFLOW_FILES.includes(relative) || RETIRABLE_WORKFLOW_DIRS.some((root) => relative.startsWith(root)); }

function blockSpan(text, module) {
  const start = `<!-- my-workflow:${module}:start -->`, end = `<!-- my-workflow:${module}:end -->`;
  const valid = /^<!-- my-workflow:(?:core|parallel|quality):(?:start|end) -->$/;
  if (text.split(/\r?\n/).some((line) => line.includes('my-workflow:') && !valid.test(line.trim()))) fail(`managed ${module} block is duplicated or altered`);
  const starts = [...text.matchAll(new RegExp(start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))]; const ends = [...text.matchAll(new RegExp(end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))];
  if (!starts.length && !ends.length) return null; if (starts.length !== 1 || ends.length !== 1 || starts[0].index > ends[0].index) fail(`managed ${module} block is incomplete or nested`);
  return [starts[0].index, ends[0].index + end.length];
}
function blockContent(sourceRoot, module, filename) {
  const body = filename === 'CLAUDE.md' ? '@AGENTS.md' : fs.readFileSync(path.join(sourceRoot, 'templates/adoption/agents', `${module}.md`), 'utf8').trimEnd();
  return `<!-- my-workflow:${module}:start -->\n${body}\n<!-- my-workflow:${module}:end -->`;
}
function composeBlocks(sourceRoot, root, modules, manifest) {
  const outputs = {}, blocks = {}, conflicts = [];
  for (const filename of ['AGENTS.md', 'CLAUDE.md']) {
    const target = path.join(root, filename); let rendered = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : filename === 'AGENTS.md' ? fs.readFileSync(path.join(sourceRoot, filename), 'utf8') : '';
    for (const module of (filename === 'AGENTS.md' ? BLOCK_LAYERS : ['core'])) if (modules.includes(module)) {
      let span; try { span = blockSpan(rendered, module); } catch { conflicts.push(`${filename}:${module}`); continue; }
      const block = blockContent(sourceRoot, module, filename); const key = `${filename}:${module}`;
      if (span) { if (manifest.blocks[key] && sha256(Buffer.from(rendered.slice(span[0], span[1]))) !== manifest.blocks[key].sha256) { conflicts.push(key); continue; } rendered = rendered.slice(0, span[0]) + block + rendered.slice(span[1]); }
      else { if (rendered && !rendered.endsWith('\n')) rendered += '\n'; if (rendered) rendered += '\n'; rendered += block + '\n'; }
      blocks[key] = { sha256: sha256(Buffer.from(block)) };
    }
    if (Buffer.from(rendered).compare(fs.existsSync(target) ? fs.readFileSync(target) : Buffer.alloc(0)) !== 0) outputs[filename] = Buffer.from(rendered);
  }
  return { outputs, blocks, conflicts };
}

function mergeIgnore(existing, entries, remove = []) { const lines = (existing ? existing.toString() : '').split(/\r?\n/).filter((line) => line && !remove.includes(line) && !entries.includes(line)); return Buffer.from([...lines, ...entries, ''].join('\n')); }
function sourceBytes(root, relative) { return fs.readFileSync(path.join(root, (CONSUMER_MISSING_SOURCES[relative] || relative).split('/').join(path.sep))); }

export function buildPlan({ sourceRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..'), targetRoot = process.cwd(), selectedModules, modules } = {}) {
  const source = asRoot(sourceRoot), target = asRoot(targetRoot); const requested = selectedModules || modules; const requestedResolved = requestedModules(requested); const installedManifest = loadManifest(target); const installed = installedManifest.layers || []; const effective = resolveModules([...requestedResolved, ...installed]);
  const entries = catalog(source, effective); const actions = [], records = {}, conflicts = [], retired = [];
  const missing = new Set(effective.flatMap((module) => LAYER_MISSING_PATHS[module].flatMap((item) => sourceFiles(source, item)))); if (effective.includes('core')) Object.keys(CONSUMER_MISSING_SOURCES).forEach((item) => missing.add(item));
  for (const [relative, module] of [...entries.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const packageBytes = sourceBytes(source, relative), installedBytes = adoptedBytes(relative, packageBytes), destination = safePath(target, relative, 'managed destination'); const previous = installedManifest.files[relative]; const exists = fs.existsSync(destination);
    if (missing.has(relative)) { actions.push({ path: relative, kind: exists ? 'preserve' : 'add', modules: [module], reason: exists ? 'consumer-owned file unchanged' : 'new neutral scaffolding' }); records[relative] = record(module, 'consumer', packageBytes, null); continue; }
    if (previous?.ownership === 'consumer' && !isProvider(relative)) { actions.push({ path: relative, kind: 'preserve', modules: [module], reason: 'consumer-owned file unchanged' }); records[relative] = previous; continue; }
    const current = exists ? fs.readFileSync(destination) : null; let kind;
    if (previous) { if (!current || sha256(current) !== previous.installed_sha256) { kind = 'conflict'; conflicts.push(relative); } else kind = current.compare(installedBytes) === 0 ? 'no-change' : 'update'; }
    else if (!exists) kind = 'add'; else if (current.compare(installedBytes) === 0) kind = 'claim'; else { kind = 'conflict'; conflicts.push(relative); }
    actions.push({ path: relative, kind, modules: [module], sourceSha256: sha256(packageBytes), installedSha256: exists ? sha256(installedBytes) : undefined, reason: kind === 'conflict' ? 'consumer content requires a decision' : kind === 'claim' ? 'file unchanged; ownership record added' : undefined }); records[relative] = record(module, 'managed', packageBytes, installedBytes);
  }
  for (const [relative, previous] of Object.entries(installedManifest.files || {}).sort(([a], [b]) => a.localeCompare(b))) {
    if (records[relative] || previous.ownership === 'consumer' || relative.startsWith('knowledge/wiki/')) continue;
    const destination = safePath(target, relative, 'retired destination'); if (!isRetirable(relative)) continue;
    if (!fs.existsSync(destination)) { retired.push(relative); actions.push({ path: relative, kind: 'remove', modules: [previous.layer], reason: 'retired workflow path' }); continue; }
    const expected = previous.ownership === 'consumer' ? previous.source_sha256 : previous.installed_sha256; if (sha256(fs.readFileSync(destination)) !== expected) { conflicts.push(relative); actions.push({ path: relative, kind: 'conflict', modules: [previous.layer], reason: 'retired file was modified' }); } else { retired.push(relative); actions.push({ path: relative, kind: 'remove', modules: [previous.layer], reason: 'retired workflow path' }); }
  }
  const blocks = composeBlocks(source, target, effective, installedManifest); conflicts.push(...blocks.conflicts);
  const staged = { '.gitignore': mergeIgnore(fs.existsSync(path.join(target, '.gitignore')) ? fs.readFileSync(path.join(target, '.gitignore')) : null, WORKFLOW_GITIGNORE_ENTRIES, LEGACY_WORKFLOW_GITIGNORE_ENTRIES), '.ignore': mergeIgnore(fs.existsSync(path.join(target, '.ignore')) ? fs.readFileSync(path.join(target, '.ignore')) : null, WORKFLOW_SEARCHIGNORE_ENTRIES), ...blocks.outputs };
  for (const action of actions) if (['add', 'update', 'claim'].includes(action.kind)) staged[action.path] = adoptedBytes(action.path, sourceBytes(source, action.path));
  const newManifest = { schema: 1, workflow_version: WORKFLOW_VERSION, layers: effective, files: records, blocks: blocks.blocks }; staged['.my-workflow/adoption.json'] = Buffer.from(`${JSON.stringify(newManifest, null, 2)}\n`);
  const selectedSet = new Set(effective); const assessments = effective.map((id) => { const own = actions.filter((action) => action.modules.includes(id)); const kinds = new Set(own.map((action) => action.kind)); const status = kinds.has('conflict') ? 'conflict' : kinds.has('replace') ? 'modified' : kinds.has('update') ? 'outdated' : kinds.has('add') || kinds.has('claim') ? 'not installed' : 'up to date'; return { id, status, requiredBy: LAYERS.filter((candidate) => candidate !== id && DEPENDENCIES[candidate].includes(id) && selectedSet.has(candidate)), actions: own }; });
  const noChange = actions.length > 0 && actions.every((action) => ['preserve', 'no-change'].includes(action.kind)) && !conflicts.length;
  return { plan: { target, packageVersion: WORKFLOW_VERSION, selectedModules: effective, assessments, actions: actions.map((action) => ({ ...action, modules: [...new Set(action.modules)] })).sort((a, b) => a.path.localeCompare(b.path)), unresolved: [...new Set(conflicts)].sort(), retired, status: conflicts.length ? 'conflict' : noChange ? 'no-change' : 'ready', message: noChange ? 'Selected modules are up to date. No files will change.' : undefined }, staged, manifest: newManifest };
}

export function assessModules(input) { return buildPlan(input).plan.assessments; }
export function recalculatePlan(planInput, decisions = {}) { const result = buildPlan({ ...planInput, selectedModules: decisions.selectedModules || planInput.selectedModules }); if (decisions.replacements) for (const action of result.plan.actions) if (action.kind === 'conflict' && decisions.replacements.includes(action.path)) { action.kind = 'replace'; result.plan.unresolved = result.plan.unresolved.filter((item) => item !== action.path); } return result; }

export default { buildPlan, assessModules, recalculatePlan, resolveModules, requestedModules, loadManifest, validateRelative, safePath, sha256, LAYERS };
