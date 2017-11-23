import * as actionTypes from '../constants/store'

export function update(data) {
    return {
        type: actionTypes.STORE_UPDATE,
        data
    }
}

export function rm(data) {
    return {
        type: actionTypes.STORE_RM,
        data
    }
}

export function add(data) {
    return {
        type: actionTypes.STORE_ADD,
        data
    }
}