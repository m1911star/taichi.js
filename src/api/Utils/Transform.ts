import { matmul } from "../Math"
import * as ti from "../../taichi"
export class Transform {
    constructor() {
        this.reset()
    }
    reset() {
        this.matrix =
            [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ]
    }
    matrix: number[][] = []

    mul(other: Transform) {
        let result = new Transform
        result.matrix = matmul(this.matrix, other.matrix) as number[][]
        return result
    }

    static getKernelType() {
        return ti.types.struct({
            matrix: ti.types.matrix(ti.f32, 4, 4)
        })
    }
}