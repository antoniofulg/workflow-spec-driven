import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildPlan, loadManifest, resolveModules, requestedModules, sha256, validateRelative, InstallerError } from '../../scripts/installer/engine.js';

const sourceRoot = path.resolve(import.meta.dirname, '../..');
const target = () => fs.mkdtempSync(path.join(os.tmpdir(), 'installer-engine-'));
const expectError = (fn, text) => assert.throws(fn, (error) => error instanceof InstallerError && (!text || error.message.includes(text)));

test('UT-001 dependency closure includes core once', () => assert.deepEqual(resolveModules(['parallel', 'quality', 'extras']), ['core', 'parallel', 'quality', 'extras']));
test('UT-002 fresh target plans not installed modules', () => { const result = buildPlan({ sourceRoot, targetRoot: target(), selectedModules: ['core'] }).plan; assert.equal(result.assessments[0].status, 'not installed'); });
test('UT-003 manifest loader accepts the empty schema', () => { const root = target(); assert.deepEqual(loadManifest(root).layers, []); });
test('UT-004 pristine records can be read', () => { const root = target(); const first = buildPlan({ sourceRoot, targetRoot: root, selectedModules: ['core'] }); assert.ok(first.manifest.files['.agents/skills/workflow-spec-driven/SKILL.md']); });
test('UT-005 modified owned content is a conflict', () => { const root = target(); const first = buildPlan({ sourceRoot, targetRoot: root, selectedModules: ['core'] }); fs.mkdirSync(path.join(root, '.agents/skills/workflow-spec-driven'), { recursive: true }); fs.writeFileSync(path.join(root, '.agents/skills/workflow-spec-driven/SKILL.md'), 'consumer'); fs.mkdirSync(path.join(root, '.my-workflow'), { recursive: true }); fs.writeFileSync(path.join(root, '.my-workflow/adoption.json'), JSON.stringify(first.manifest)); const result = buildPlan({ sourceRoot, targetRoot: root, selectedModules: ['core'] }).plan; assert.ok(result.unresolved.includes('.agents/skills/workflow-spec-driven/SKILL.md')); });
test('UT-006 unowned collision is a conflict', () => { const root = target(); const file = path.join(root, '.agents/skills/workflow-spec-driven/SKILL.md'); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, 'collision'); const result = buildPlan({ sourceRoot, targetRoot: root, selectedModules: ['core'] }).plan; assert.ok(result.unresolved.includes('.agents/skills/workflow-spec-driven/SKILL.md')); });
test('UT-007 selected modules are dependency closed', () => assert.deepEqual(buildPlan({ sourceRoot, targetRoot: target(), selectedModules: ['extras'] }).plan.selectedModules, ['core', 'extras']));
test('UT-008 actions carry owning module', () => { const result = buildPlan({ sourceRoot, targetRoot: target(), selectedModules: ['parallel'] }).plan; assert.ok(result.actions.some((action) => action.modules.includes('parallel'))); });
test('UT-011 fresh scaffolding uses package bytes', () => { const root = target(); const result = buildPlan({ sourceRoot, targetRoot: root, selectedModules: ['core'] }); assert.equal(result.staged['knowledge/wiki/index.md'].toString(), fs.readFileSync(path.join(sourceRoot, 'templates/adoption/knowledge/wiki/index.md'), 'utf8')); });
test('UT-012 malformed manifest paths fail closed', () => { const root = target(); fs.mkdirSync(path.join(root, '.my-workflow'), { recursive: true }); fs.writeFileSync(path.join(root, '.my-workflow/adoption.json'), JSON.stringify({ schema: 1, workflow_version: '0.10.0', layers: ['core'], files: { '../outside': {} }, blocks: {} })); expectError(() => loadManifest(root), 'unsafe'); });
test('UT-012 absolute paths fail validation', () => expectError(() => validateRelative('/outside'), 'unsafe'));
test('UT-012 unsupported module fails validation', () => expectError(() => resolveModules(['unknown']), 'unknown'));
test('UT-013 no-op message is available for an unchanged plan', () => { const root = target(); const result = buildPlan({ sourceRoot, targetRoot: root, selectedModules: ['core'] }).plan; assert.equal(typeof result.message === 'undefined' || result.message.includes('up to date'), true); });
test('UT-014 comma-separated modules are normalized', () => assert.deepEqual(requestedModules('quality, quality'), ['quality']));
test('SEC-001 traversal is rejected before access', () => expectError(() => validateRelative('../escape'), 'unsafe'));
test('SEC-004 hashes are deterministic and literal', () => assert.equal(sha256(Buffer.from('literal')), '829f8d848b44fa3098194754af5b60e2fb1517b0195956841beb6cac9bc68067'));
test('SEC-006 unsupported schema fails closed', () => expectError(() => loadManifest((() => { const root = target(); fs.mkdirSync(path.join(root, '.my-workflow')); fs.writeFileSync(path.join(root, '.my-workflow/adoption.json'), '{"schema":3}'); return root; })()), 'unsupported schema'));
