// Loads the workspace-level .env, then runs the command passed to it.
//
//   node ../../scripts/with-env.mjs next dev -p 3000
//
// This is what makes a single root .env work: Next.js and Nest both read their
// configuration from process.env, and neither looks outside its own app
// directory for a .env file, so the values have to be in place before the tool
// starts. Parsing is done here rather than through a dependency so the script
// works on any supported Node version with nothing installed.

import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envFile = resolve(repoRoot, '.env');

function parseEnv(contents) {
  const parsed = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    let line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    if (line.startsWith('export ')) line = line.slice('export '.length).trim();

    const separator = line.indexOf('=');
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    if (!key) continue;

    let value = line.slice(separator + 1).trim();
    const quote = value[0];

    if (
      value.length > 1 &&
      (quote === '"' || quote === "'") &&
      value.endsWith(quote)
    ) {
      value = value.slice(1, -1);
    } else {
      // Strip a trailing comment, but only when it is spaced off from the
      // value, so that a `#` inside a URL or password survives.
      value = value.replace(/\s+#.*$/, '');
    }

    parsed[key] = value;
  }

  return parsed;
}

if (existsSync(envFile)) {
  for (const [key, value] of Object.entries(
    parseEnv(readFileSync(envFile, 'utf8')),
  )) {
    // The surrounding environment wins, so CI and one-off overrides such as
    // `PORT=5000 pnpm dev` keep working.
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error(
    'with-env: usage: node scripts/with-env.mjs <command> [args...]',
  );
  process.exit(1);
}

const child = spawn(command, args, {
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
});

child.on('error', (error) => {
  console.error(`with-env: could not run \`${command}\`: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  process.exit(signal ? 1 : (code ?? 0));
});
