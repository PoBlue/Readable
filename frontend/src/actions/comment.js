import { getComments } from '../api/Api'
import {
    GET_ALL_COMMENT
} from './actionType'

function getAll(comments) {
    return {
        type: GET_ALL_COMMENT,
        comments
    }
}

export function getAllComments(post) {
    return dispatch => {
        return getComments(post).then(data =>
            dispatch(getAll(data)))
    }
}