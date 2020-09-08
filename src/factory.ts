/**
    @module: factory
*/

import {Mask, MaskOptions} from './interfaces'
import {calcSum, validateAndCreateContext} from './helper'

export type BuildMaskFunction = () => Mask

export const buildMaskFactory = (
    {values}: MaskOptions,
    modesRef?: {[x: string]: number}
): BuildMaskFunction => {
    const ctx = validateAndCreateContext(values)
    const {mask} = ctx
    let {map, combos, pw2s} = ctx
    return (): Mask => {
        const valsLength = values.length
        const valueLength = 2 ** valsLength

        for (let i = 0; i < valueLength; i++) {
            let combo = ''
            combos = []
            pw2s = []
            map = {}
            for (let j = 0; j < valsLength; j++) {
                const pw2 = i & (2 ** j)

                if (pw2) {
                    combo += values[j]
                    combos.push(values[j])
                    pw2s.push(pw2)
                    map[values[j]] = pw2

                    if (modesRef) {
                        modesRef[values[j]] = pw2
                    }
                }
            }

            if (combo !== '') {
                const sum = calcSum(pw2s)

                mask[sum] = {
                    sum,
                    values: combos,
                    nums: pw2s,
                    map
                }
            }
        }

        return mask
    }
}
