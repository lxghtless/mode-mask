import {Mask, MaskDatum} from './interfaces'

import {arraysMatch} from './helper'

/**
    @class MdMask
 */
export class MdMask implements Mask {
    [x: number]: MaskDatum
    indexOf(n: number): MaskDatum | undefined {
        return this[n]
    }
    fromValues(values: string[], ignoreCase?: boolean): MaskDatum | undefined {
        for (const mk of Object.keys(this)) {
            const mKey = parseInt(mk, 10)
            const item = this[mKey]
            if (typeof item.sum === 'number') {
                if (arraysMatch(item.values, values, ignoreCase)) {
                    return item
                }
            }
        }
    }
}
