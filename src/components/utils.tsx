import {Constants} from "../types/types"

export function pathTail(path: string) {
    const split = path.split("/")
    return split[split.length - 1]
}

export function constantArrayByKey(constants: Constants, key: string) {
    let result = []
    for (const v of Object.values(constants)) {
        // @ts-ignore
        result.push(v[key])
    }
    return result
}
