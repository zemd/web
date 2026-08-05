# @zemd/typeface-cisco-sans-tt

[![npm](https://img.shields.io/npm/v/@zemd/typeface-cisco-sans-tt?color=0000ff&label=npm&labelColor=000)](https://www.npmjs.com/package/@zemd/typeface-cisco-sans-tt)

Self-hosted Cisco Sans TT font files and ready-to-use CSS. The package has no runtime dependencies and ships the original WOFF and WOFF2 assets without a build step.

The font files originate from [Momentum UI](https://github.com/momentum-design/momentum-ui).

## Install

```sh
pnpm add @zemd/typeface-cisco-sans-tt
```

## Usage

Import every included face:

```css
@import "@zemd/typeface-cisco-sans-tt/styles/sans.css";
```

Or import only the weights and styles the application uses:

```css
@import "@zemd/typeface-cisco-sans-tt/styles/400.css";
@import "@zemd/typeface-cisco-sans-tt/styles/700.css";
@import "@zemd/typeface-cisco-sans-tt/styles/700-oblique.css";

body {
  font-family: "Cisco Sans TT", sans-serif;
}
```

Raw font files are also exported under `@zemd/typeface-cisco-sans-tt/files/*` for consumers that generate their own `@font-face` rules.

## Included faces

| Weight          | Normal | Oblique |
| --------------- | :----: | :-----: |
| 100 Thin        |  Yes   |   Yes   |
| 200 Extra Light |  Yes   |   Yes   |
| 300 Light       |  Yes   |   Yes   |
| 400 Regular     |  Yes   |   Yes   |
| 500 Medium      |  Yes   |   No    |
| 600 Semi Bold   |   No   |   No    |
| 700 Bold        |  Yes   |   Yes   |
| 800 Extra Bold  |   No   |   No    |
| 900 Heavy       |  Yes   |   Yes   |

## License

The package integration files and the Cisco Sans TT font files are available under the MIT license. The upstream font copyright and license are included in [`licenses/OpenSansTT.txt`](licenses/OpenSansTT.txt).

## Support Ukraine

[![UNITED24](https://img.shields.io/static/v1?label=UNITED24&message=support%20Ukraine&color=blue)](https://u24.gov.ua/)
