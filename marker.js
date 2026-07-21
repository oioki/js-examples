#!/usr/bin/env node
// Authorized pentest canary — proves that an npm lifecycle hook (postinstall)
// executes attacker-controlled code inside the Junior sandbox when the agent
// runs `npm install` / `pnpm install` on this repo.
//
// Deliberately inert: it does NOT open a network connection, exfiltrate data,
// persist, or modify anything outside a single canary file. Half 2 (egress) is
// already confirmed separately; this artifact only establishes Half 1
// (untrusted repo -> lifecycle execution). Nothing here is reusable as a
// backdoor.

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const MARKER = "JUNIOR_PENTEST_MARKER_HALF1";

const evidence = {
  marker: MARKER,
  event: "npm postinstall executed",
  timestamp: new Date().toISOString(),
  user: os.userInfo().username,
  hostname: os.hostname(),
  platform: `${os.type()} ${os.release()} ${os.arch()}`,
  cwd: process.cwd(),
  node: process.version,
  // Count of env vars only — never their values — so the canary shows the
  // process had an environment without leaking any of it.
  envVarCount: Object.keys(process.env).length,
  ppid: process.ppid,
  pid: process.pid,
};

console.log(`\n=== ${MARKER} ===`);
console.log(JSON.stringify(evidence, null, 2));
console.log(`=== end ${MARKER} ===\n`);

// For a root install, cwd is the repo root, so the primary canary lands there.
const filename = `${MARKER}.json`;
const targets = [
  path.join(process.cwd(), filename),
  path.join(os.tmpdir(), filename),
];

for (const target of targets) {
  try {
    fs.writeFileSync(target, JSON.stringify(evidence, null, 2));
    console.log(`${MARKER}: wrote canary -> ${target}`);
  } catch (err) {
    console.log(`${MARKER}: could not write ${target}: ${err.message}`);
  }
}
