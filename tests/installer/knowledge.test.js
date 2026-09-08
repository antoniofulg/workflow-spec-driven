import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { knowledgeTransfers, prepareKnowledge, writeKnowledgeChecklist } from '../../scripts/installer/knowledge.js';
const temp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'installer-knowledge-'));

test('UT-010 replacement yields source, destination, reason, and pending status', () => { const items = knowledgeTransfers({ actions: [{ path: 'AGENTS.md', kind: 'replace' }] }, '.my-workflow/backups/now'); assert.deepEqual(items[0], { source: '.my-workflow/backups/now/files/AGENTS.md', destination: 'docs/product/AGENT-CONTEXT.md', reason: 'Consumer-authored instructions require manual review.', status: 'Pending human transfer' }); });
test('IT-004 checklist is written inside the backup only', () => { const root = temp(); const backup = path.join(root, 'backup'); fs.mkdirSync(backup); const items = knowledgeTransfers({ actions: [{ path: 'AGENTS.md', kind: 'replace' }] }, backup); const result = writeKnowledgeChecklist(backup, items); assert.equal(result, path.join(backup, 'knowledge-transfer.md')); assert.match(fs.readFileSync(result, 'utf8'), /Pending human transfer/); assert.equal(fs.existsSync(path.join(root, 'knowledge', 'AGENTS.md')), false); });
test('E2E-002 fresh scaffold has no transfer artifact or source content', () => { const root = temp(); const items = prepareKnowledge({ actions: [{ path: 'knowledge/AGENTS.md', kind: 'add' }] }, { targetRoot: root, backup: null }); assert.deepEqual(items, []); assert.deepEqual(fs.readdirSync(root), []); });
