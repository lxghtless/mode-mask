# mode-mask

> Manage mode combinations


[![CircleCI](https://circleci.com/gh/lxghtless/mode-mask/tree/master.svg?style=svg)](https://circleci.com/gh/lxghtless/mode-mask/tree/master)


### Install

```
npm i mode-mask -S
```

### Usage

```
const ModeMask = require('mode-mask')

const modes = {
  READ: 1,
  WRITE: 2,
  DELETE: 4,
  AUTO_CREATE: 8
};

const mask = new ModeMask(Object.keys(modes));

console.log(mask.indexOf(modes.WRITE));

/**
{ sum: 2,
  values: [ 'WRITE' ],
  nums: [ 2 ],
  map: { WRITE: 2 } }
*/

console.log(mask.indexOf(modes.READ + modes.WRITE + modes.AUTO_CREATE));

/**
{ sum: 11,
  values: [ 'READ', 'WRITE', 'AUTO_CREATE' ],
  nums: [ 1, 2, 8 ],
  map: { READ: 1, WRITE: 2, AUTO_CREATE: 8 } }
*/
```