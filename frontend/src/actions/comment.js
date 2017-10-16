import { getComments } from '../api/Api'
import {
    GET_ALL_COMMENT
} from './actionType'

function getAll(comments, post) {
    return {
        type: GET_ALL_COMMENT,
        comments,
        post
    }
}

export function getAllComments(post) {
    return dispatch => {
        return getComments(post).then(data =>
            dispatch(getAll(data, post)))
    }
}