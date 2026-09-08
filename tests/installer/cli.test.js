import test from 'node:test';
import assert from 'node:assert/strict';
import { main, HELP } from '../../bin/workflow-spec-driven.js';
const stream = (tty = true) => ({ isTTY: tty, output: '', write(value) { this.output += value; } });

test('IT-018 help documents canonical install', async () => { const stdout = stream(); const code = await main(['--help'], { stdout, stderr: stream(), stdin: stream(false) }); assert.equal(code, 0); assert.match(stdout.output, /install/); assert.match(stdout.output, /Node\.js 18/); assert.match(stdout.output, /current working directory/); });
test('CLI rejects missing command with help', async () => { const stderr = stream(); const code = await main([], { stdout: stream(), stderr, stdin: stream(false) }); assert.equal(code, 2); assert.equal(stderr.output, `${HELP}\n`); });
test('CLI rejects unknown arguments before target inspection', async () => { const stderr = stream(); const code = await main(['install', '--target', '/outside'], { stdout: stream(), stderr, stdin: stream(false) }); assert.equal(code, 2); assert.match(stderr.output, /Usage/); });
test('IT-009 rejects non-interactive install exactly', async () => { const stderr = stream(); const code = await main(['install'], { stdout: stream(false), stderr, stdin: stream(false) }); assert.equal(code, 2); assert.equal(stderr.output, 'Interactive terminal required; run this command in a TTY.\n'); });
test('CLI accepts only the canonical install verb in a TTY', async () => { const stderr = stream(); const code = await main(['install', 'extra'], { stdout: stream(), stderr, stdin: stream(true) }); assert.equal(code, 2); });
