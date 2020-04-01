/** 
    @module: registry
*/

import {Mask, MaskCache} from './interfaces'
import {buildMaskFactory} from './factory'

const DEFAULT_MASK_ID = 'mode.mask.default.id'
const cache: MaskCache = {}

export const registerMask = (values: string[], id = DEFAULT_MASK_ID): void => {
    cache[id] = buildMaskFactory({values})()
}

export const resolveMask = (id = DEFAULT_MASK_ID): Mask => cache[id]
