<p align="center">
  <h2 align="center">mode mask</h2>
</p>

<p align="center">
  Given an array of strings or a {} of {string: number} build a mask data structure to manage things like user <b>permissions</b> in apps. Servers that are enabled with certain <b>modes</b> or <b>features</b> might also find this useful.
</p>

<p align="center">
	<a href="https://www.npmjs.com/package/mode-mask">
		<img src="https://img.shields.io/npm/v/mode-mask?color=blue" />
	</a>
	<a href="https://www.typescriptlang.org/">
		<img src="https://aleen42.github.io/badges/src/typescript.svg" />
	</a>
	<a href="https://eslint.org/">
		<img src="https://aleen42.github.io/badges/src/eslint.svg" />
	</a>
</p>

<p align="center">
  <h3 align="center">Install</h3>
</p>

<pre align="center">npm i mode-mask</pre>

<br />

<pre align="center">yarn add mode-mask</pre>

### Basic Usage with MaskFactory

```ts
import {buildMaskFactory} from 'mode-mask'

const modes = {
    READ: 1,
    WRITE: 2,
    DELETE: 4,
    AUTO_CREATE: 8
}

// build mask with factory from array of strings
const mask = buildMaskFactory({
    values: Object.keys(modes)
})()

// get the MaskDatum of a given permissions sum
const rda = mask.indexOf(modes.READ + modes.DELETE + modes.AUTO_CREATE)
// with an explicit number
const rda = mask.indexOf(13)
// from string values
const rda = mask.fromValues(['READ', 'DELETE', 'AUTO_CREATE'])
```

### Basic Usage with MaskProvider

```ts
import {MaskProvider} from 'mode-mask'

const modes = {
    READ: 1,
    WRITE: 2,
    DELETE: 4,
    AUTO_CREATE: 8
}

// build mask with provider with a map of <string, number>
const mask = MaskProvider.resolveMask(modes)

// get the MaskDatum of a given permissions sum
const rda = mask.indexOf(modes.READ + modes.DELETE + modes.AUTO_CREATE)
// with an explicit number
const rda = mask.indexOf(13)
// from string values
const rda = mask.fromValues(['READ', 'DELETE', 'AUTO_CREATE'])
```

### MaskProvider from values with derived mask

```ts
import {MaskProvider} from 'mode-mask'

const expectedModes = {
    READ: 1,
    WRITE: 2,
    DELETE: 4,
    AUTO_CREATE: 8
}

const maskProvider = MaskProvider.fromModesOrValues(Object.keys(expectedModes))
const {mask, modes, values} = maskProvider

// get the MaskDatum of a given permissions sum
const rda = mask.indexOf(modes.READ + modes.DELETE + modes.AUTO_CREATE)
// with an explicit number
const rda = mask.indexOf(13)
// from string values
const rda = mask.fromValues(['READ', 'DELETE', 'AUTO_CREATE'])

// modes are derived from values
expect(modes).to.deep.equal(expectedModes)
```

### MaskProvider from values with derived mask

```ts
import {MaskProvider} from 'mode-mask'

const expectedModes = {
    READ: 1,
    WRITE: 2,
    DELETE: 4,
    AUTO_CREATE: 8
}

const maskProvider = MaskProvider.fromModesOrValues(expectedModes)
const {mask, modes, values} = maskProvider

// get the MaskDatum of a given permissions sum
const rda = mask.indexOf(modes.READ + modes.DELETE + modes.AUTO_CREATE)
// with an explicit number
const rda = mask.indexOf(13)
// from string values
const rda = mask.fromValues(['READ', 'DELETE', 'AUTO_CREATE'])

// values are derived from modes
expect(values).to.deep.equal(Object.keys(expectedModes))
```

### rda output from usage examples

```json
{
    "sum": 13,
    "values": ["READ", "DELETE", "AUTO_CREATE"],
    "nums": [1, 4, 8],
    "map": {
        "READ": 1,
        "DELETE": 4,
        "AUTO_CREATE": 8
    }
}
```
