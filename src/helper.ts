/** 
    @module: helper
*/

import {MaskContext, ValidateMaskModesResult} from './interfaces'
import {MdMask} from './mask'

export const calcSum = (nums: number[]): number => {
    return nums.reduce((total: number, num: number) => total + num)
}

export const isPowerOf2 = (n: number): boolean => {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        return false
    }

    return n !== 0 && (n & (n - 1)) === 0
}

export const validateMaskModes = (modes: {
    [x: string]: number
}): ValidateMaskModesResult => {
    const errors: string[] = []

    for (const [value, n] of Object.entries(modes)) {
        if (!isPowerOf2(n)) {
            errors.push(
                `numeric value of ${n} for "${value}" is not a power of 2`
            )
        }
    }

    return {
        errors,
        isValid: errors.length === 0
    }
}

export const emptyArray = (values: string[]): string | undefined => {
    if (!Array.isArray(values)) {
        return 'values must be []'
    }

    if (values.length === 0) {
        return 'values length must be gt 0'
    }
}

export const createMaskContext = (values: string[]): MaskContext => ({
    values,
    map: {},
    mask: new MdMask(),
    combos: [],
    pw2s: []
})

export const validateAndCreateContext = (values: string[]): MaskContext => {
    const valuesInvalid = emptyArray(values)
    if (valuesInvalid) {
        throw new TypeError(valuesInvalid)
    }

    return createMaskContext(values)
}

export const arraysMatch = (
    a1: string[],
    a2: string[],
    ignoreCase?: boolean
): boolean => {
    if (a1.length !== a2.length) {
        // unmatching array length means they can't match
        return false
    }

    if (a1.length === 0) {
        // matching array length of zero is a match
        return true
    }

    const l = a1.length
    const m = new Set<string>()

    for (let i = 0; i < l; i++) {
        for (let z = 0; z < l; z++) {
            if (ignoreCase) {
                if (a1[i].toLowerCase().trim() === a2[z].toLowerCase().trim()) {
                    m.add(a1[i].toLowerCase().trim())
                }
            } else {
                if (a1[i] === a2[z]) {
                    m.add(a1[i])
                }
            }
        }
    }

    return l === m.size
}
