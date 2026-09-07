#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PREREQUISITE_ERROR = "my-workflow requires Python 3.11 or newer available as python3.";
const COMMANDS_WITH_DEFAULT_LAYERS = new Set(["plan", "apply", "resolve"]);

function hasLayerSelector(args) {
  return args.some((arg) => arg === "--layers" || arg.startsWith("--layers="));
}

function withDefaultLayers(args) {
  const endOfOptions = args.indexOf("--");
  const boundary = endOfOptions === -1 ? args.length : endOfOptions;
  return [...args.slice(0, boundary), "--layers", "full", ...args.slice(boundary)];
}

function hasSupportedPython() {
  const probe = spawnSync(
    "python3",
    ["-c", "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}')"],
    { encoding: "utf8", shell: false },
  );
  if (probe.error || probe.status !== 0) return false;
  const match = probe.stdout.trim().match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) return false;
  const major = Number(match[1]);
  const minor = Number(match[2]);
  return major > 3 || (major === 3 && minor >= 11);
}

function main() {
  if (!hasSupportedPython()) {
    process.stderr.write(`${PREREQUISITE_ERROR}\n`);
    return 2;
  }
  const args = process.argv.slice(2);
  const command = args[0];
  const endOfOptions = args.indexOf("--");
  const optionArgs = args.slice(1, endOfOptions === -1 ? args.length : endOfOptions);
  const forwarded = COMMANDS_WITH_DEFAULT_LAYERS.has(command) && !hasLayerSelector(optionArgs)
    ? withDefaultLayers(args)
    : args;
  const adopter = join(dirname(fileURLToPath(import.meta.url)), "..", "scripts", "adopt.py");
  const child = spawnSync("python3", [adopter, ...forwarded], { stdio: "inherit", shell: false });
  return typeof child.status === "number" ? child.status : 2;
}

process.exitCode = main();
