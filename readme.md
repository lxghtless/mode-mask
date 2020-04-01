<p align="center">
  <h2 align="center">mode mask</h2>
</p>

<p align="center">
  Given an array of strings build a mask data structure to manage things like user <b>permissions</b> in apps. Servers that are enabled with certain <b>modes</b> or <b>features</b> might also find this useful.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/mode-mask"><img src="https://img.shields.io/npm/v/mode-mask?color=blue"/></a>&nbsp;<a href="https://circleci.com/gh/lxghtless/mode-mask/tree/master"><img src="https://circleci.com/gh/lxghtless/mode-mask/tree/master.svg?style=svg"/></a>&nbsp;<a href="https://codecov.io/gh/lxghtless/mode-mask"><img src="https://codecov.io/gh/lxghtless/mode-mask/branch/master/graph/badge.svg"/></a>&nbsp;<a href="https://www.typescriptlang.org/"><img src="https://badgen.net/badge/icon/typescript?icon=typescript&label" /></a>&nbsp;<a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" /></a>
</p>

<p align="center">
  <h3 align="center">Install</h3>
</p>

<pre align="center">npm i mode-mask</pre>

<br />

<pre align="center">yarn add mode-mask</pre>


### Basic Usage

```js
    import {buildMaskFactory} from 'mode-mask'

    const modes = {
        READ: 1,
        WRITE: 2,
        DELETE: 4,
        AUTO_CREATE: 8
    }

    const buildMask = buildMaskFactory({
        values: Object.keys(modes)
    })

    const mask = buildMask()

    // each of these locate a defined index
    t.truthy(mask[modes.READ])
    t.truthy(mask[modes.WRITE + modes.DELETE])
    t.truthy(mask.indexOf(modes.DELETE))
    t.truthy(mask.indexOf(modes.READ + modes.DELETE + modes.AUTO_CREATE))
    // test simple value combos work & ignore case
    t.truthy(mask.fromValues(['READ', 'WRITE']))
    t.truthy(mask.fromValues(['read', 'Write'], true))
```
