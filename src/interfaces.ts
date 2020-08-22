/** 
    @module: interfaces
*/

export interface Mask {
    [x: number]: MaskDatum
    indexOf(n: number): MaskDatum | undefined
    fromValues(values: string[], ignoreCase?: boolean): MaskDatum | undefined
}

export interface MaskCache {
    [x: string]: Mask
}

export interface MaskContext extends MaskOptions {
    map: StrNumMap
    mask: Mask
    combos: string[]
    pw2s: number[]
}

export interface MaskDatum {
    sum: number
    values: string[]
    nums: number[]
    map: StrNumMap
}

export interface MaskOptions {
    values: string[]
}

export interface StrNumMap {
    [x: string]: number
}
