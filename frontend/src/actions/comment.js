import { 
    getComments,
    createComment,
    deleteComment,
    updateComment,
    voteComment
} from '../api/Api'
import {
    GET_ALL_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    CREATE_COMMENT,
    VOTE_COMMENT
} from './actionType'

function getAll(comments, post) {
    return {
        type: GET_ALL_COMMENT,
        comments,
        post
    }
}

function deleteC(comment) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

function update(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

function create(comment) {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

function vote(comment) {
    return {
        type: VOTE_COMMENT,
        comment
    }
}

export function getAllComments(post) {
    return dispatch => {
        return getComments(post).then(data =>
            dispatch(getAll(data, post)))
    }
}

export function createCommentAction(comment) {
    return dispatch => {
        return createComment(comment).then(_ => dispatch(create(comment)))
    }
}

export function deleteCommentAction(comment) {
    return dispatch => {
        return deleteComment(comment).then(_ => dispatch(deleteC(comment)))
    }
}

export function updateCommentAction(comment) {
    return dispatch => {
        return updateComment(comment).then(_ => dispatch(update(comment)))
    }
}

export function voteCommentAction(comment, isUp) {
    return dispatch => {
        return voteComment(comment, isUp).then(data => dispatch(vote(data)))
    }
}