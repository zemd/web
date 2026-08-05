# @zemd/typeface-open-sauce-fonts

[![npm](https://img.shields.io/npm/v/@zemd/typeface-open-sauce-fonts?color=0000ff&label=npm&labelColor=000)](https://www.npmjs.com/package/@zemd/typeface-open-sauce-fonts)

Self-hosted Open Sauce font files and ready-to-use CSS. The package has no runtime dependencies and ships TTF and WOFF2 assets without a build step.

The font files originate from [Open Sauce Fonts](https://github.com/marcologous/Open-Sauce-Fonts). The packaging layout is inspired by [Fontsource](https://github.com/fontsource/fontsource).

## Install

```sh
pnpm add @zemd/typeface-open-sauce-fonts
```

## Usage

Import all weights and styles for one family:

```css
@import "@zemd/typeface-open-sauce-fonts/styles/sans/sans.css";

body {
  font-family: "Open Sauce Sans", sans-serif;
}
```

The aggregate stylesheets are:

- `styles/one/one.css` for Open Sauce One, without ink traps
- `styles/sans/sans.css` for Open Sauce Sans, with ink traps
- `styles/two/two.css` for Open Sauce Two, with rounded corners

To reduce transferred font data, import individual faces instead:

```css
@import "@zemd/typeface-open-sauce-fonts/styles/one/400.css";
@import "@zemd/typeface-open-sauce-fonts/styles/one/400-italic.css";
@import "@zemd/typeface-open-sauce-fonts/styles/one/700.css";
```

Raw font files are exported under `@zemd/typeface-open-sauce-fonts/files/*` for consumers that generate their own `@font-face` rules.

## Included faces

All three families include normal and italic faces for weights 300, 400, 500, 600, 700, 800, and 900.

## License

The package integration files are available under the MIT license. The bundled font files remain under the SIL Open Font License 1.1; the copyright and license for each family are included in the [`licenses`](licenses) directory.

## Support Ukraine

[![UNITED24](https://img.shields.io/static/v1?label=UNITED24&message=support%20Ukraine&color=blue)](https://u24.gov.ua/)
