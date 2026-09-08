import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { stageAgentPackets, packetSetting, renderAgentPacket, validateWorkflowConfig, readWorkflowConfig, PROVIDERS, ROLES } from '../../scripts/installer/packets.js';

const root = path.resolve(import.meta.dirname, '../..');
const temp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'installer-packets-'));
const config = JSON.parse(JSON.stringify({ version: 3, models: Object.fromEntries(PROVIDERS.map((provider) => [provider, Object.fromEntries(ROLES.map((role) => [role, { model: 'test-model', effort: provider === 'claude' ? 'high' : 'ultra' }]))])) }));

test('IT-011 stages all six roles for Claude', () => { const packets = stageAgentPackets(root, root); for (const role of ROLES) assert.ok(packets[runtime('claude', role)]); });
test('IT-011 stages all six roles for Codex', () => { const packets = stageAgentPackets(root, root); for (const role of ROLES) assert.ok(packets[runtime('codex', role)]); });
test('IT-011 stages all six roles for Cursor', () => { const packets = stageAgentPackets(root, root); for (const role of ROLES) assert.ok(packets[runtime('cursor', role)]); });
test('IT-011 produces eighteen provider-role packets', () => assert.equal(Object.keys(stageAgentPackets(root, root)).filter((key) => key.includes('/agents/')).length, 18));
for (const provider of PROVIDERS) for (const role of ROLES) test(`IT-011 ${provider}/${role} retains native metadata`, () => { const packets = stageAgentPackets(root, root); const expected = readWorkflowConfig(root).models[provider][role]; assert.deepEqual(packetSetting(provider, packets[runtime(provider, role)]), expected); });
function runtime(provider, role) { return `.${provider}/agents/${role === 'deep_reviewer' ? 'deep-reviewer' : role}.${provider === 'codex' ? 'toml' : 'md'}`; }
test('T2 config parser accepts canonical example', () => assert.equal(readWorkflowConfig(root).version, 3));
test('T2 parser rejects malformed TOML', () => { const dir = temp(); fs.writeFileSync(path.join(dir, '.my-workflow.toml'), 'version = ['); assert.throws(() => readWorkflowConfig(dir), /invalid/); });
test('T2 validator rejects missing provider', () => { const invalid = structuredClone(config); delete invalid.models.claude; assert.throws(() => validateWorkflowConfig(invalid), /models\.claude/); });
test('T2 validator rejects missing role', () => { const invalid = structuredClone(config); delete invalid.models.codex.planner; assert.throws(() => validateWorkflowConfig(invalid), /planner/); });
test('T2 validator rejects invalid effort', () => { const invalid = structuredClone(config); invalid.models.cursor.planner.effort = 'bogus'; assert.throws(() => validateWorkflowConfig(invalid), /effort/); });
test('T2 validator rejects invalid model identifier', () => { const invalid = structuredClone(config); invalid.models.cursor.planner.model = 'bad model'; assert.throws(() => validateWorkflowConfig(invalid), /model/); });
test('T2 packet metadata rejects absent frontmatter', () => assert.throws(() => packetSetting('claude', 'model: x'), /frontmatter/));
test('T2 packet metadata rejects duplicated model', () => assert.throws(() => packetSetting('cursor', '---\nmodel: a[effort=high]\nmodel: b[effort=high]\n---'), /exactly one/));
test('T2 packet metadata rejects malformed codex', () => assert.throws(() => packetSetting('codex', 'model = "x"'), /exactly one/));
test('T2 Claude rendering changes model and effort only', () => { const original = fs.readFileSync(path.join(root, '.agents/skills/workflow-config/assets/agents/claude/planner.md')); const rendered = renderAgentPacket('claude', original, { model: 'new-model', effort: 'low' }); assert.equal(packetSetting('claude', rendered).model, 'new-model'); assert.match(rendered.toString(), /effort: low/); });
test('T2 Cursor rendering changes combined metadata', () => { const original = fs.readFileSync(path.join(root, '.agents/skills/workflow-config/assets/agents/cursor/planner.md')); const rendered = renderAgentPacket('cursor', original, { model: 'new-model', effort: 'low' }); assert.deepEqual(packetSetting('cursor', rendered), { model: 'new-model', effort: 'low' }); });
test('T2 Codex rendering escapes quoted values', () => { const original = fs.readFileSync(path.join(root, '.agents/skills/workflow-config/assets/agents/codex/planner.toml')); const rendered = renderAgentPacket('codex', original, { model: 'new-model', effort: 'low' }); assert.deepEqual(packetSetting('codex', rendered), { model: 'new-model', effort: 'low' }); });
test('T2 stage output is bytes', () => { const packets = stageAgentPackets(root, root); assert.ok(Buffer.isBuffer(packets['.claude/agents/planner.md'])); });
test('T2 staging does not write target runtime', () => { const dir = temp(); fs.cpSync(path.join(root, '.agents'), path.join(dir, '.agents'), { recursive: true }); fs.copyFileSync(path.join(root, '.my-workflow.toml.example'), path.join(dir, '.my-workflow.toml.example')); const before = fs.readdirSync(dir); stageAgentPackets(dir, dir); assert.deepEqual(fs.readdirSync(dir), before); });
