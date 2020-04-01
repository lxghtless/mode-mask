import {buildMaskFactory, registerMask, resolveMask} from '../src'
import test from 'ava'

test('buildMask should define each expected index', t => {
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

    t.truthy(mask[modes.READ])
    t.truthy(mask[modes.WRITE])
    t.truthy(mask[modes.DELETE])
    t.truthy(mask[modes.AUTO_CREATE])
})

test('buildMask should define each expected index via combinations', t => {
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

    t.truthy(mask.indexOf(modes.READ + modes.DELETE))
    t.truthy(mask.indexOf(modes.READ + modes.DELETE + modes.AUTO_CREATE))
    t.truthy(mask.indexOf(modes.READ + modes.WRITE + modes.AUTO_CREATE))
})

test('buildMask should not define unexpected modes', t => {
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

    t.falsy(mask[modes.READ + modes.DELETE + 16])
})

test('Mask find index fromValues', t => {
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

    // test simple value combos work
    t.truthy(mask.fromValues(['READ', 'WRITE']))
    t.truthy(mask.fromValues(['WRITE']))
    // test order doesn't matter
    t.truthy(mask.fromValues(['DELETE', 'WRITE', 'AUTO_CREATE', 'READ']))
    // test duplicates return nothing
    t.falsy(mask.fromValues(['READ', 'READ']))
    // test non existent values return nothing
    t.falsy(mask.fromValues(['NOT_A_VALUE']))
    // test simple value combos work & ignore case
    t.truthy(mask.fromValues(['READ', 'write'], true))
    // test order doesn't matter & ignore case
    t.truthy(mask.fromValues(['DELETE', 'WRITE', 'auto_create', 'Read'], true))
    // test duplicates return nothing & ignore case
    t.falsy(mask.fromValues(['READ', 'read'], true))
})

test('Mask find index fromValues & ignores case', t => {
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

    // test simple value combos work & ignore case
    t.truthy(mask.fromValues(['READ', 'write'], true))
    // test order doesn't matter & ignore case
    t.truthy(mask.fromValues(['DELETE', 'WRITE', 'auto_create', 'Read'], true))
    // test duplicates return nothing & ignore case
    t.falsy(mask.fromValues(['READ', 'read'], true))
})

test('buildMask throws when values is an empty array', t => {
    const error = t.throws(() =>
        buildMaskFactory({
            values: []
        })
    )

    t.is(error.message, 'values length must be gt 0')
})

test('registry should get default and return default', t => {
    const modes = {
        READ: 1,
        WRITE: 2,
        DELETE: 4,
        AUTO_CREATE: 8
    }

    registerMask(Object.keys(modes))

    const mask = resolveMask()

    // test simple value combos work
    t.truthy(mask.fromValues(['READ', 'WRITE']))
    t.truthy(mask.fromValues(['WRITE']))
    // test simple value combos work & ignore case
    t.truthy(mask.fromValues(['READ', 'write'], true))
    // test order doesn't matter & ignore case
    t.truthy(mask.fromValues(['DELETE', 'WRITE', 'auto_create', 'Read'], true))
    // test duplicates return nothing & ignore case
    t.falsy(mask.fromValues(['READ', 'read'], true))
})
