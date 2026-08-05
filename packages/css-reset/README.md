# @zemd/css-reset

[![npm](https://img.shields.io/npm/v/@zemd/css-reset?color=0000ff&label=npm&labelColor=000)](https://www.npmjs.com/package/@zemd/css-reset)

A small CSS reset for modern projects. It gives you a clean starting point without locking you into any design system.

## What it does

The main reset (`index.css`) handles the basics:

- Sets `box-sizing: border-box` on all elements
- Removes default margins and paddings (keeps them on headings, paragraphs, and lists)
- Sets sensible defaults for font rendering, kerning, and ligatures
- Wraps headings with `text-wrap: balance` and paragraphs with `text-wrap: pretty`
- Makes images, SVGs, and videos responsive
- Normalizes form elements, tables, and links
- Enables `scroll-behavior: smooth` when the user has no motion preference
- and more

## Install

```sh
pnpm add @zemd/css-reset
# or
npm install @zemd/css-reset
```

## Files

All exports are plain CSS. Pick what you need.

| File                         | What it does                                                        |
| ---------------------------- | ------------------------------------------------------------------- |
| `@zemd/css-reset/index.css`  | Main reset - start here                                             |
| `@zemd/css-reset/extra.css`  | Pointer cursors for clickable elements, underlines for inline links |
| `@zemd/css-reset/quotes.css` | Language-aware quote marks                                          |
| `@zemd/css-reset/all.css`    | Everything above in one import                                      |

> **Tip:** You can also import without the `.css` extension, e.g. `@zemd/css-reset/extra`.

> **Note:** The main reset sets English-only default quotes on `:where(html, :host)`. If you use `quotes.css`, make sure it's imported **after** `index.css` so the language-specific overrides take effect.

## Usage

### Basic

```css
@import "@zemd/css-reset/index.css";

/* If your tooling supports it, this shorter form also works: */
@import "@zemd/css-reset";

/* Layers keep your reset clearly separated from your app and component styles: */
@layer reset;
@import "@zemd/css-reset/index.css" layer(reset);
```

### Everything at once

If you want the full reset with all optional files included:

```css
@import "@zemd/css-reset/all.css";

/* Or with a layer: */
@layer reset;
@import "@zemd/css-reset/all.css" layer(reset);
```

### Picking individual files

```css
@layer reset;

@import "@zemd/css-reset/index.css" layer(reset);
@import "@zemd/css-reset/extra.css" layer(reset);
@import "@zemd/css-reset/quotes.css" layer(reset);
```

## Using with Tailwind v4

Skip Tailwind Preflight so the two resets don't overlap:

```css
@layer theme, reset, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "@zemd/css-reset/index.css" layer(reset);
@import "tailwindcss/utilities.css" layer(utilities);
```

Add any optional files to the same `reset` layer.

## License

Released under the [Apache 2.0 license](LICENSE).

## Support

Report bugs through the [monorepo issue tracker](https://github.com/zemd/web/issues).

[![UNITED24](https://img.shields.io/static/v1?label=UNITED24&message=support%20Ukraine&color=blue)](https://u24.gov.ua/)
