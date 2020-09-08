import {Mask} from './interfaces'
import {validateMaskModes} from './helper'
import {buildMaskFactory} from './factory'
import {registerMask, resolveMask} from './registry'

export class MaskProvider {
    mask: Mask
    modes: {[x: string]: number}
    values: string[]

    constructor(modesOrValues: {[x: string]: number} | string[]) {
        if (Array.isArray(modesOrValues)) {
            const modes = {}
            this.mask = buildMaskFactory({values: modesOrValues}, modes)()
            this.modes = modes
            this.values = modesOrValues
        } else {
            this.mask = MaskProvider.resolveMask(modesOrValues)
            this.modes = modesOrValues
            this.values = Object.keys(modesOrValues)
        }
    }

    /**
     * Register the encapsulated Mask
     * @param {string} [id=mode.mask.default.id] - Mode Mask registration id
     * @return {void} Nothing
     */
    register(id?: string): void {
        registerMask(this.mask, id)
    }

    /**
     * Build a Mask Provider from modes or values
     * @param {([x: string]: number|string[])} modesOrValues - Modes map object
     * @return {MaskProvider} - A Mode Mask Provideer
     */
    static fromModesOrValues(
        modesOrValues: {[x: string]: number} | string[]
    ): MaskProvider {
        return new MaskProvider(modesOrValues)
    }

    /**
     * Resolve modes as a mask
     * @param {[x: string]: number} modes - Modes map object
     * @return {Mask} - A Mode Mask
     */
    static resolveMask(modes: {[x: string]: number}): Mask {
        const validationResult = validateMaskModes(modes)

        if (!validationResult.isValid) {
            throw new Error(validationResult.errors.join(', '))
        }

        return buildMaskFactory({
            values: Object.keys(modes)
        })()
    }

    /**
     * Resolve and register modes as a mask
     * @param {[x: string]: number} modes - Modes map object
     * @param {string} [id=mode.mask.default.id] - Mode Mask registration id
     * @return {Mask} - A Mode Mask
     */
    static resolveAndRegistryMask(
        modes: {[x: string]: number},
        id?: string
    ): Mask {
        let mask = resolveMask(id)

        if (mask) {
            return mask
        }

        mask = this.resolveMask(modes)

        registerMask(mask)

        return mask
    }
}
