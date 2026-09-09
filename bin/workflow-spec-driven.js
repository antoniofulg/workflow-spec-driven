#!/usr/bin/env node
import process from 'node:process';
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { runInstallWizard } from '../scripts/installer/terminal.js';

export const HELP = `Usage: workflow-spec-driven <command>\n\nCommands:\n  install    Install or update workflow modules in the current directory\n\nCanonical invocation: workflow-spec-driven install\nModules: core, parallel, quality, extras\nTarget: current working directory\nBackups: existing files are verified under .my-workflow/backups/ before replacement\nRuntime: Node.js 18 or newer`;
const CANCELLATION = 'Installation cancelled. No files changed.';
const isReadlineCancellation = (error) => error?.code === 'ABORT_ERR' && error?.name === 'AbortError';

export async function main(argv = process.argv.slice(2), runtime = {}) {
  const stdin = runtime.stdin || process.stdin; const stdout = runtime.stdout || process.stdout; const stderr = runtime.stderr || process.stderr;
  if (argv.includes('--help') || argv.includes('-h')) { stdout.write(`${HELP}\n`); return 0; }
  if (!argv.length || argv[0] !== 'install' || argv.length !== 1) { stderr.write(`${HELP}\n`); return 2; }
  if (!stdin.isTTY || !stdout.isTTY) { stderr.write('Interactive terminal required; run this command in a TTY.\n'); return 2; }
  const readlineOutput = process.env.NO_COLOR === undefined ? stdout : new Proxy(stdout, { get(target, property, receiver) { return property === 'write' ? () => true : Reflect.get(target, property, receiver); } });
  const readline = runtime.readline || createInterface({ input: stdin, output: readlineOutput, terminal: true });
  try {
    const result = await runInstallWizard({ targetRoot: runtime.targetRoot || process.cwd(), sourceRoot: runtime.sourceRoot, input: () => readline.question(''), write: (value) => stdout.write(`${value}\n`), width: runtime.width, color: process.env.NO_COLOR === undefined, requireGit: runtime.requireGit ?? true, transaction: runtime.transaction });
    return result.code ?? 0;
  } catch (error) { if (isReadlineCancellation(error)) { stdout.write(`${CANCELLATION}\n`); return 0; } stderr.write(`${error.message}\n`); return 1; } finally { if (!runtime.readline) readline.close(); }
}

if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) main().then((code) => { process.exitCode = code; });
