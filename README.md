# hub-pop

A floating GitHub card widget with a liquid/blob animation. Drop it on any page and a glassy button pops into the corner — click it and a card expands showing your name, GitHub, and website.

- 🫧 Liquid blob button with a glass hover effect
- 💳 Glassmorphism card with a soft animated background
- 👋 Periodic "hey i'm here :)" nudge tooltip
- 🌗 Dark & light themes, four corner positions
- 📦 Zero runtime dependencies, ~8 kB minified
- ⌨️ Accessible — keyboard/Escape support, respects `prefers-reduced-motion`

## Installation

```bash
npm install hub-pop
```

## Usage

### ES modules / React / Vue

```js
import { HubPop } from 'hub-pop';

HubPop({
  name: 'Ali',
  github: 'https://github.com/ali',
  website: 'https://ali.dev',
  position: 'bottom-right',
  theme: 'dark',
});
```

### Plain HTML (CDN)

```html
<script src="https://unpkg.com/hub-pop/dist/index.min.js"></script>
<script>
  HubPop({
    name: 'Ali',
    github: 'https://github.com/ali',
    website: 'https://ali.dev',
  });
</script>
```

## Options

| Option     | Type                                                          | Required | Default          | Description                                    |
| ---------- | ------------------------------------------------------------- | -------- | ---------------- | ---------------------------------------------- |
| `name`     | `string`                                                      | ✅       | —                | Name shown big and bold at the top of the card |
| `github`   | `string`                                                      | ✅       | —                | Full URL to your GitHub profile                |
| `website`  | `string`                                                      | ❌       | —                | Full URL to your site (row hidden if omitted)  |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | ❌       | `'bottom-right'` | Corner the button is anchored to               |
| `theme`    | `'dark' \| 'light'`                                           | ❌       | `'dark'`         | Color theme                                    |

## Instance API

`HubPop()` returns a handle for programmatic control:

```js
const widget = HubPop({ name: 'Ali', github: 'https://github.com/ali' });

widget.open();    // open the card
widget.close();   // close the card
widget.toggle();  // toggle open/closed
widget.destroy(); // remove from the DOM and detach listeners
```

```ts
interface HubPopInstance {
  open: () => void;
  close: () => void;
  toggle: () => void;
  destroy: () => void;
}
```

## TypeScript

Types ship with the package — `HubPopOptions`, `HubPopInstance`, `Position`, and `Theme` are all exported.

```ts
import { HubPop, HubPopOptions } from 'hub-pop';

const config: HubPopOptions = {
  name: 'Ali',
  github: 'https://github.com/ali',
};

HubPop(config);
```

## Development

```bash
npm install      # install dev dependencies
npm run build    # build dist/ (ESM, CJS, minified IIFE + types)
npm run dev      # rebuild on change (watch mode)
```

Then open `demo.html` over HTTP (e.g. `npx serve .`) to try it locally — opening the file directly won't load the ES module.

### Build output

| File                 | Format          | Used by                |
| -------------------- | --------------- | ---------------------- |
| `dist/index.js`      | CommonJS        | `require()` / Node     |
| `dist/index.esm.js`  | ES module       | bundlers / `import`    |
| `dist/index.min.js`  | minified IIFE   | `<script>` / CDN       |
| `dist/index.d.ts`    | TypeScript types | editors / type-checking |

## License

ISC
