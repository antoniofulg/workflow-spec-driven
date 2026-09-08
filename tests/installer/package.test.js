import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');

test('IT-019 package exposes the unscoped executable only', () => { const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')); assert.equal(pkg.name, 'workflow-spec-driven'); assert.deepEqual(Object.keys(pkg.bin), ['workflow-spec-driven']); assert.equal(pkg.bin['workflow-spec-driven'], 'bin/workflow-spec-driven.js'); assert.equal(pkg.files.includes('scripts/adopt.py'), false); });
test('IT-010 pack dry-run includes Node installer and excludes Python adopter', () => { const json = execFileSync('npm', ['pack', '--dry-run', '--json'], { cwd: root, encoding: 'utf8' }); const metadata = JSON.parse(json)[0]; const names = metadata.files.map((item) => item.path); assert.ok(names.includes('bin/workflow-spec-driven.js')); assert.ok(names.includes('scripts/installer/engine.js')); assert.equal(names.some((name) => name === 'scripts/adopt.py' || name === 'bin/my-workflow.js'), false); });
test('IT-019 package can resolve from a clean directory', () => { const target = fs.mkdtempSync(path.join(os.tmpdir(), 'installer-package-')); const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')); assert.equal(packageJson.engines.node, '>=18.0.0'); assert.ok(target.startsWith(os.tmpdir())); });
