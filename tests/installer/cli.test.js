import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { main, HELP } from '../../bin/workflow-spec-driven.js';
import { applyTransaction } from '../../scripts/installer/transaction.js';
import { runInstallWizard } from '../../scripts/installer/terminal.js';
const root = path.resolve(import.meta.dirname, '../..');
const temp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'installer-cli-'));
const feed = (values) => { let index = 0; return { question: async () => values[index++] }; };
const stream = (tty = true) => ({ isTTY: tty, output: '', write(value) { this.output += value; } });

test('IT-018 help documents canonical install', async () => { const stdout = stream(); const code = await main(['--help'], { stdout, stderr: stream(), stdin: stream(false) }); assert.equal(code, 0); assert.match(stdout.output, /install/); assert.match(stdout.output, /Node\.js 18/); assert.match(stdout.output, /current working directory/); });
test('CLI rejects missing command with help', async () => { const stderr = stream(); const code = await main([], { stdout: stream(), stderr, stdin: stream(false) }); assert.equal(code, 2); assert.equal(stderr.output, `${HELP}\n`); });
test('CLI rejects unknown arguments before target inspection', async () => { const stderr = stream(); const code = await main(['install', '--target', '/outside'], { stdout: stream(), stderr, stdin: stream(false) }); assert.equal(code, 2); assert.match(stderr.output, /Usage/); });
test('IT-009 rejects non-interactive install exactly', async () => { const stderr = stream(); const code = await main(['install'], { stdout: stream(false), stderr, stdin: stream(false) }); assert.equal(code, 2); assert.equal(stderr.output, 'Interactive terminal required; run this command in a TTY.\n'); });
test('CLI accepts only the canonical install verb in a TTY', async () => { const stderr = stream(); const code = await main(['install', 'extra'], { stdout: stream(), stderr, stdin: stream(true) }); assert.equal(code, 2); });
test('IT-007 CLI observes injected real backup failure with exit 1 and full residue zero', async () => { const target = temp(); const setup = ['1', 'y', 'y']; await runInstallWizard({ sourceRoot: root, targetRoot: target, input: async () => setup.shift() }); const agents = path.join(target, 'AGENTS.md'); fs.writeFileSync(agents, fs.readFileSync(agents, 'utf8').replace('<!-- my-workflow:core:end -->', 'consumer edit\n<!-- my-workflow:core:end -->')); const before = fs.readFileSync(agents); const stdout = stream(); const stderr = stream(); const code = await main(['install'], { stdin: stream(true), stdout, stderr, targetRoot: target, sourceRoot: root, requireGit: false, readline: { question: (() => { const answers = ['1', 'y', '1', 'y']; return async () => answers.shift(); })(), close() {} }, transaction: (prepared) => applyTransaction({ ...prepared, failBackup: 'AGENTS.md' }) }); assert.equal(code, 1); assert.match(stdout.output, /Backup failed: AGENTS\.md could not be verified/); assert.deepEqual(fs.readFileSync(agents), before); assert.equal(fs.existsSync(path.join(target, '.my-workflow/transaction.json')), false); assert.equal(fs.existsSync(path.join(target, '.my-workflow/backups')), false); });
