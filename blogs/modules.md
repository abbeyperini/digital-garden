## TL;DR CommonJS vs ESM

Knowledge Level: Evergreen

Planted: 01/31/2023

Last Tended: 02/06/2023

Topics: [web development](/topic.html?topic=webDevelopment)

![Boromir from Lord of the Rings saying one does not simply export node.js modules](https://images.abbeyperini.com/modules.png)

In a [Node.js](https://nodejs.org/en/) project, you're likely to run into both CommonJS and ESM modules. Here's how to tell these module types apart at a glance.

### CommonJS

[CommonJS](https://nodejs.org/api/modules.html) modules were part of Node.js when it was written in 2009. They run synchronously. Imports and exports are resolved and scripts are executed dynamically at runtime.

CommonJS uses `__filename`, `__dirname`, and `NODE_PATH` variables. ESM does not.

### ESM

[ECMAScript modules](https://nodejs.org/api/esm.html) (ESM) or ES Modules were introduced in 2015 with JavaScriptES6 (also known as [ECMAScript](https://www.freecodecamp.org/news/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5/) 2015 or ECMAScript 6). They are asynchronous. Imports and exports are resolved statically at parse time. The ESM module loader then downloads and parses scripts. Finally, the script executes.

ESM uses top-level `await` (`await` in a file outside an `async function()`). CommonJS does not.

### Package.json

CommonJS:

```JSON
"type": "commonjs"
```

ESM:

```JSON
"type": "module"
```

Node.js throws an error for ESM modules without `"type": "module"`, but I have yet to see a `package.json` with `"type": "commonjs"` in the wild.

### Imports

CommonJS:

```JavaScript
var module = require('file path');
```

ESM:

```JavaScript
import defaultStuff, { namedStuff } from 'file path';
```

### Exports

CommonJS:

```JavaScript
// default
module.exports =

// default read-only
exports =

// named
module.exports.name =

// named read-only
exports.name =
```

ESM:

```JavaScript
// default
export default name

// named
export name
```

### File Extensions

Node.js will treat `.js` and `.ts` as CommonJS modules by default.

CommonJS uses `.cjs` for JavaScript and `.cts` for TypeScript.

ESM uses `.mjs` for JavaScript and `.mts` for TypeScript.

### Runtime Environments

CommonJS is supported in all versions of Node.js.

ESM is supported in browsers and Node.js v12 or higher.

### Strict Mode

CommonJS needs `use strict` at the top of the file.

ESM uses strict mode by default.

### This

In CommonJS modules, `this` points at `exports`.

In ES modules, `this` is `undefined`.

### Conclusion

At this point, I've upgraded a package and gotten an error like "ES Modules not supported" or "[module] is a CommonJS module, which may not support all module.exports as named exports" a few times. While troubleshooting, the search results I got were guides on how to write these modules or treatises on which one is better. This is the summary I wish I had before I had to jump down a rabbit hole just to understand an error.
