import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8").replaceAll("\r\n", "\n");

void test("workflow callers pin the zemd/js v4 shared contracts", () => {
  const expected = new Map([
    ["repo-ci.yml", "shared-ci.yml"],
    ["repo-codeql.yml", "shared-codeql.yml"],
    ["repo-release.yml", "shared-release.yml"],
    ["repo-scorecard.yml", "shared-scorecard.yml"],
    ["repo-zizmor.yml", "shared-zizmor.yml"],
  ]);
  const files = readdirSync(new URL(".github/workflows/", root))
    .filter((file) => file.endsWith(".yml") || file.endsWith(".yaml"))
    .sort();
  const revisions = new Set();

  assert.deepStrictEqual(files, [...expected.keys()].sort());

  for (const [file, sharedWorkflow] of expected) {
    const workflow = read(`.github/workflows/${file}`);
    const reference = workflow.match(
      /^    uses: zemd\/js\/\.github\/workflows\/(shared-[a-z-]+\.yml)@([a-f0-9]{40}) # (v\d+)$/m,
    );
    assert.ok(reference, `${file} must contain one pinned shared-workflow caller`);
    assert.strictEqual(reference[1], sharedWorkflow);
    revisions.add(reference[2]);
    assert.strictEqual(reference[3], "v4");
  }
  assert.strictEqual(revisions.size, 1, "all shared-workflow callers must use the same revision");

  const ci = read(".github/workflows/repo-ci.yml");
  assert.ok(ci.includes('os-matrix: \'["ubuntu-latest", "macos-latest", "windows-latest"]\''));
  assert.ok(ci.includes("dependency-review-severity: high"));

  const release = read(".github/workflows/repo-release.yml");
  for (const setting of [
    "RELEASE_BRANCHKEEPER_CLIENT_ID",
    "RELEASE_PUBLISHER_CLIENT_ID",
    "RELEASE_BRANCHKEEPER_PRIVATE_KEY",
    "RELEASE_PUBLISHER_PRIVATE_KEY",
    "NPM_TOKEN",
  ]) {
    assert.ok(release.includes(setting));
  }
  assert.doesNotMatch(release, /shared-tooling-(?:repository|ref)/);
});

void test("pnpm and Dependabot enforce the same seven-day release-age policy", () => {
  const workspace = read("pnpm-workspace.yaml");
  assert.match(workspace, /^storeDir: \.pnpm-store$/m);
  assert.match(workspace, /^minimumReleaseAge: 10080$/m);
  assert.match(workspace, /^minimumReleaseAgeStrict: true$/m);
  assert.match(workspace, /^minimumReleaseAgeIgnoreMissingTime: false$/m);
  assert.match(workspace, /^trustPolicy: no-downgrade$/m);
  assert.match(workspace, /^ {2}- "@zemd\/\*"$/m);

  const dependabot = read(".github/dependabot.yml");
  for (const ecosystem of ["npm", "docker", "devcontainers", "github-actions"]) {
    assert.ok(dependabot.includes(`package-ecosystem: "${ecosystem}"`));
  }
  assert.strictEqual(dependabot.match(/^ {6}default-days: 7(?: |$)/gm)?.length, 4);
  assert.match(dependabot, /^ {8}- "@zemd\/\*"$/m);
});

void test("native hooks replace Husky and run the repository checks", () => {
  const manifest = JSON.parse(read("package.json"));
  assert.strictEqual(manifest.devDependencies.husky, undefined);
  assert.strictEqual(manifest.scripts.prepare, "pnpm run git-hooks-install");
  assert.strictEqual(manifest.scripts["git-hooks-install"], "./.githooks/install.sh");
  assert.strictEqual(manifest.scripts["pre-commit"], "./.githooks/pre-commit");
  assert.strictEqual(manifest.scripts["pre-push"], "./.githooks/pre-push");
  assert.strictEqual(manifest.scripts["lint-publish"], "turbo run lint-publish");
  assert.strictEqual(existsSync(new URL(".husky/pre-commit", root)), false);

  if (process.platform !== "win32") {
    for (const path of [".githooks/install.sh", ".githooks/pre-commit", ".githooks/pre-push"]) {
      assert.notStrictEqual(
        statSync(new URL(path, root)).mode & 0o111,
        0,
        `${path} must be executable`,
      );
    }
  }

  const preCommit = read(".githooks/pre-commit");
  for (const command of [
    "pnpm run lint-fix",
    "pnpm exec turbo run pre-commit",
    "pnpm run format",
    "git add --all",
  ]) {
    assert.ok(preCommit.includes(command));
  }
  assert.ok(read(".githooks/pre-push").includes("exec pnpm run release-check"));

  for (const path of [
    "packages/css-reset/package.json",
    "fonts/typeface-cisco-sans-tt/package.json",
    "fonts/typeface-open-sauce-fonts/package.json",
  ]) {
    assert.strictEqual(JSON.parse(read(path)).scripts["lint-publish"], "publint");
  }
});

void test("the Dev Container pins the non-root toolchain without Playwright-only setup", () => {
  const config = JSON.parse(read(".devcontainer/devcontainer.json"));
  assert.strictEqual(config.name, "zemd/web");
  assert.strictEqual(config.remoteUser, "node");
  assert.strictEqual(config.postCreateCommand, "bash .devcontainer/post-create.sh");
  assert.strictEqual(config.mounts.length, 2);
  assert.ok(config.mounts.every((mount) => !mount.includes("playwright")));
  assert.strictEqual(config.customizations.vscode.settings["typescript.tsdk"], undefined);
  assert.ok(
    config.customizations.vscode.extensions.every((extension) => /@\d+\.\d+\.\d+$/.test(extension)),
  );

  const dockerfile = read(".devcontainer/Dockerfile");
  assert.match(dockerfile, /FROM ghcr\.io\/zizmorcore\/zizmor:\d+\.\d+\.\d+@sha256:[a-f0-9]{64}/);
  assert.match(
    dockerfile,
    /FROM mcr\.microsoft\.com\/devcontainers\/javascript-node:[^\s]+@sha256:[a-f0-9]{64}/,
  );
  assert.match(dockerfile, /^USER node$/m);
  assert.doesNotMatch(read(".devcontainer/post-create.sh"), /playwright/);
});
