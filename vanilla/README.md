# Camp vanilla boilerplate

## Install

```bash
npm run install
```

## Develop

```bash
npm run dev
```

## Build

```bash
npm run build
```

### Start builded project

```bash
npm run preview
```

## Adding new page

To add new page, create new folder in `src` folder and add `index.html` file inside.
After this route to `vite.config.js`(see example).

## Example

Let's say you want to add page with `cool-page` route. You create `index.html` inside  `src/cool-page/`.
Then you add to `input` array.

```js
// vite.config.js
resolve(root, 'cool-page', 'index.html')
```

Now your `vite.config.js` should look like this:

```js
import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(root, 'index.html'),
        resolve(root, 'example', 'index.html'),
        resolve(root, 'example', 'nested', 'index.html'),
        resolve(root, 'cool-page', 'index.html')
      ]
    }
  }
});
```

You can remove/rename example routes. `index.html` in `src` folder is root file. It means, that your `localhost:3000` will be represented by `index.html` file.

## Stylelint

Boilerplate uses `Stylelint`. To see all errors and warnings in `css` files, install `Stylelint` extension in your code editor.

- [VSCode](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- WebStorm has built in support by default.

Or you can run

```bash
npm run stylelint
```

## Editor config

Consider installing `EditorConfig for VS Code` extension if you're using `VSCode`.
