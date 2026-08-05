import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const workflow = readFileSync(new URL("../workflows/release.yml", import.meta.url), "utf8");

void test("publishes exclusively through npm trusted publishing", () => {
  assert.match(workflow, /id-token: write # npm trusted publishing \(OIDC\)/);
  assert.match(workflow, /registry-url: "https:\/\/registry\.npmjs\.org"/);
  assert.match(workflow, /package-manager-cache: false/);
  assert.match(workflow, /- name: Publish to npm\n\s+run: pnpm publish -r/);
  assert.doesNotMatch(workflow, /NODE_AUTH_TOKEN|NPM_TOKEN/);
});

void test("uses the latest LTS Node.js release in every Node-powered workflow", () => {
  const directory = new URL("../workflows/", import.meta.url);
  const workflows = readdirSync(directory).filter((file) => file.endsWith(".yml"));

  for (const file of workflows) {
    const contents = readFileSync(new URL(file, directory), "utf8");
    const setupCount = contents.match(/uses: actions\/setup-node@/g)?.length ?? 0;
    const latestLtsCount = contents.match(/node-version: "lts\/\*"/g)?.length ?? 0;
    assert.equal(latestLtsCount, setupCount, `${file} must use the latest LTS release`);
  }
});
