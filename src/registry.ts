/** 
    @module: registry
*/

import {Mask, MaskCache} from './interfaces'
import {buildMaskFactory} from './factory'

const DEFAULT_MASK_ID = 'mode.mask.default.id'
const cache: MaskCache = {}

/**
 * Resolve a registered mask
 * @param {string[] | Mask} valuesOrMask - A values array or precontructed mask
 * @param {string} [id=mode.mask.default.id] - Mode Mask registration id
 * @return {void} Nothing
 */
export const registerMask = (
    valuesOrMask: string[] | Mask,
    id: string = DEFAULT_MASK_ID
): void => {
    if (Array.isArray(valuesOrMask)) {
        cache[id] = buildMaskFactory({values: valuesOrMask})()
        return
    }

    cache[id] = valuesOrMask
}

/**
 * Resolve a registered mask
 * @param {string} [id=mode.mask.default.id] - Mode Mask registration id
 * @return {?Mask} - A Mode Mask
 */
export const resolveMask = (id: string = DEFAULT_MASK_ID): Mask | undefined =>
    cache[id]
