# zemd/web

[![Node.js](https://img.shields.io/badge/node-%3E%3D24-000?labelColor=000&color=0000ff)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-000?labelColor=000&color=0000ff)](https://pnpm.io)
[![Turborepo](https://img.shields.io/badge/turborepo-monorepo-000?labelColor=000&color=0000ff)](https://turborepo.com)

A pnpm and Turborepo monorepo for small, independently published web packages. Each package owns its public API, documentation, license, and release version and can be installed without the rest of the workspace.

## Packages

| Package                                                              | Version                                                                                                                                                                     | License           | Description                                     |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------- |
| [`@zemd/css-reset`](packages/css-reset)                              | [![npm](https://img.shields.io/npm/v/@zemd/css-reset?color=0000ff&label=npm&labelColor=000)](https://www.npmjs.com/package/@zemd/css-reset)                                 | `Apache-2.0`      | A small CSS reset for modern web projects       |
| [`@zemd/typeface-cisco-sans-tt`](fonts/typeface-cisco-sans-tt)       | [![npm](https://img.shields.io/npm/v/@zemd/typeface-cisco-sans-tt?color=0000ff&label=npm&labelColor=000)](https://www.npmjs.com/package/@zemd/typeface-cisco-sans-tt)       | `MIT`             | Self-hosted Cisco Sans TT font files and styles |
| [`@zemd/typeface-open-sauce-fonts`](fonts/typeface-open-sauce-fonts) | [![npm](https://img.shields.io/npm/v/@zemd/typeface-open-sauce-fonts?color=0000ff&label=npm&labelColor=000)](https://www.npmjs.com/package/@zemd/typeface-open-sauce-fonts) | `MIT AND OFL-1.1` | Self-hosted Open Sauce font files and styles    |

See each package's README for its installation instructions and exported paths.

## Getting started

```sh
git clone https://github.com/zemd/web.git
cd web
pnpm install
```

> [!NOTE]
> The repository uses [pnpm](https://pnpm.io) workspaces. Install it with `corepack enable` or follow the [pnpm installation guide](https://pnpm.io/installation).

A normal install configures the native Git hooks in [`.githooks`](.githooks). The checked-in [Dev Container](.devcontainer/devcontainer.json) provides the pinned Node.js, pnpm, and zizmor toolchain.

## Security

To report a vulnerability, follow [`SECURITY.md`](SECURITY.md). Do not disclose security reports in a public issue.

## Contributing

Issues and pull requests are welcome. Before opening a PR, run `pnpm pre-push`; CI remains authoritative.

## License

Each package declares its own license — see the table above and the `LICENSE` file inside every package directory. Unless stated otherwise, packages are released under **Apache-2.0** 😇.

## 💙 💛 Donate

[![](https://img.shields.io/static/v1?label=UNITED24&message=support%20Ukraine&color=blue)](https://u24.gov.ua/)
