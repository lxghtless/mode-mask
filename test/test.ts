import {buildMaskFactory, MaskProvider, registerMask, resolveMask} from '../src'
const {describe, it} = intern.getPlugin('interface.bdd')
const {expect} = intern.getPlugin('chai')

describe('mode-mask', () => {
    it('buildMask should define each expected index', () => {
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

        expect(mask[modes.READ]).to.not.be.undefined
        expect(mask[modes.WRITE]).to.not.be.undefined
        expect(mask[modes.DELETE]).to.not.be.undefined
        expect(mask[modes.AUTO_CREATE]).to.not.be.undefined
    })

    it('buildMask should define each expected index via combinations', () => {
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

        expect(mask.indexOf(modes.READ + modes.DELETE)).to.not.be.undefined
        expect(mask.indexOf(modes.READ + modes.DELETE + modes.AUTO_CREATE)).to
            .not.be.undefined
        expect(mask.indexOf(modes.READ + modes.WRITE + modes.AUTO_CREATE)).to
            .not.be.undefined
    })

    it('buildMask should not define unexpected modes', () => {
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

        expect(mask[modes.READ + modes.DELETE + 16]).to.be.undefined
    })

    it('Mask find index fromValues', () => {
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
        expect(mask.fromValues(['READ', 'WRITE'])).to.not.be.undefined
        expect(mask.fromValues(['WRITE'])).to.not.be.undefined
        // test order doesn't matter
        expect(mask.fromValues(['DELETE', 'WRITE', 'AUTO_CREATE', 'READ'])).to
            .not.be.undefined
        // test duplicates return nothing
        expect(mask.fromValues(['READ', 'READ'])).to.be.undefined
        // test non existent values return nothing
        expect(mask.fromValues(['NOT_A_VALUE'])).to.be.undefined
        // test simple value combos work & ignore case
        expect(mask.fromValues(['READ', 'write'], true)).to.not.be.undefined
        // test order doesn't matter & ignore case
        expect(
            mask.fromValues(['DELETE', 'WRITE', 'auto_create', 'Read'], true)
        ).to.not.be.undefined
        // test duplicates return nothing & ignore case
        expect(mask.fromValues(['READ', 'read'], true)).to.be.undefined
    })

    it('Mask find index fromValues & ignores case', () => {
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
        expect(mask.fromValues(['READ', 'write'], true)).to.not.be.undefined
        // test order doesn't matter & ignore case
        expect(
            mask.fromValues(['DELETE', 'WRITE', 'auto_create', 'Read'], true)
        ).to.not.be.undefined
        // test duplicates return nothing & ignore case
        expect(mask.fromValues(['READ', 'read'], true)).to.be.undefined
    })

    it('buildMask throws when values is an empty array', () => {
        expect(() =>
            buildMaskFactory({
                values: []
            })
        ).to.throw('values length must be gt 0')
    })

    it('registry should get default and return default', () => {
        const modes = {
            READ: 1,
            WRITE: 2,
            DELETE: 4,
            AUTO_CREATE: 8
        }

        registerMask(Object.keys(modes))

        const mask = resolveMask()

        // test simple value combos work
        expect(mask?.fromValues(['READ', 'WRITE'])).to.not.be.undefined
        expect(mask?.fromValues(['WRITE'])).to.not.be.undefined
        // test simple value combos work & ignore case
        expect(mask?.fromValues(['READ', 'write'], true)).to.not.be.undefined
        // test order doesn't matter & ignore case
        expect(
            mask?.fromValues(['DELETE', 'WRITE', 'auto_create', 'Read'], true)
        ).to.not.be.undefined
        // test duplicates return nothing & ignore case
        expect(mask?.fromValues(['READ', 'read'], true)).to.be.undefined
    })

    it('provider to resolve mask from modes map', () => {
        const modes = {
            READ: 1,
            WRITE: 2,
            DELETE: 4,
            AUTO_CREATE: 8
        }

        const mask = MaskProvider.resolveMask(modes)

        // test simple value combos work
        expect(mask.fromValues(['READ', 'WRITE'])).to.not.be.undefined
        expect(mask.fromValues(['WRITE'])).to.not.be.undefined
        // test simple value combos work & ignore case
        expect(mask.fromValues(['READ', 'write'], true)).to.not.be.undefined
        // test order doesn't matter & ignore case
        expect(
            mask.fromValues(['DELETE', 'WRITE', 'auto_create', 'Read'], true)
        ).to.not.be.undefined
        // test duplicates return nothing & ignore case
        expect(mask.fromValues(['READ', 'read'], true)).to.be.undefined
    })

    it('provider to throw when mode map contains non power of 2 values', () => {
        const modes = {
            READ: 1,
            WRITE: 3,
            DELETE: 4,
            AUTO_CREATE: 11
        }

        expect(() => MaskProvider.resolveMask(modes)).to.throw(
            'numeric value of 3 for "WRITE" is not a power of 2, numeric value of 11 for "AUTO_CREATE" is not a power of 2'
        )
    })

    it('provider to resolve and register mask from modes map', () => {
        const modes = {
            READ: 1,
            WRITE: 2,
            DELETE: 4,
            AUTO_CREATE: 8
        }

        const mask = MaskProvider.resolveAndRegistryMask(modes)

        // test simple value combos work
        expect(mask.fromValues(['READ', 'WRITE'])).to.not.be.undefined
        expect(mask.fromValues(['WRITE'])).to.not.be.undefined
        // test simple value combos work & ignore case
        expect(mask.fromValues(['READ', 'write'], true)).to.not.be.undefined
        // test order doesn't matter & ignore case
        expect(
            mask.fromValues(['DELETE', 'WRITE', 'auto_create', 'Read'], true)
        ).to.not.be.undefined
        // test duplicates return nothing & ignore case
        expect(mask.fromValues(['READ', 'read'], true)).to.be.undefined

        const registeredMask = resolveMask()

        expect(mask).to.equal(registeredMask)
    })

    it('create provider from values should create mask correctly with modes and values', () => {
        const expectedModes = {
            READ: 1,
            WRITE: 2,
            DELETE: 4,
            AUTO_CREATE: 8
        }

        const maskProvider = MaskProvider.fromModesOrValues(
            Object.keys(expectedModes)
        )
        const {mask, modes, values} = maskProvider

        // test simple value combos work
        expect(mask.fromValues(['READ', 'WRITE'])).to.not.be.undefined
        expect(mask.fromValues(['WRITE'])).to.not.be.undefined
        // test simple value combos work & ignore case
        expect(mask.fromValues(['READ', 'write'], true)).to.not.be.undefined
        // test order doesn't matter & ignore case
        expect(
            mask.fromValues(['DELETE', 'WRITE', 'auto_create', 'Read'], true)
        ).to.not.be.undefined
        // test duplicates return nothing & ignore case
        expect(mask.fromValues(['READ', 'read'], true)).to.be.undefined

        expect(modes).to.deep.equal(expectedModes)
        expect(values).to.deep.equal(Object.keys(expectedModes))
    })

    it('create provider from modes should create mask correctly with modes and values', () => {
        const expectedModes = {
            READ: 1,
            WRITE: 2,
            DELETE: 4,
            AUTO_CREATE: 8
        }

        const maskProvider = MaskProvider.fromModesOrValues(expectedModes)
        const {mask, modes, values} = maskProvider

        // test simple value combos work
        expect(mask.fromValues(['READ', 'WRITE'])).to.not.be.undefined
        expect(mask.fromValues(['WRITE'])).to.not.be.undefined
        // test simple value combos work & ignore case
        expect(mask.fromValues(['READ', 'write'], true)).to.not.be.undefined
        // test order doesn't matter & ignore case
        expect(
            mask.fromValues(['DELETE', 'WRITE', 'auto_create', 'Read'], true)
        ).to.not.be.undefined
        // test duplicates return nothing & ignore case
        expect(mask.fromValues(['READ', 'read'], true)).to.be.undefined

        expect(modes).to.deep.equal(expectedModes)
        expect(values).to.deep.equal(Object.keys(expectedModes))
    })
})
