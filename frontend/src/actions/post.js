import { getCategoryPosts, getPosts } from '../api/Api'
import {
    GET_POST_FROM_CATEGORY,
    GET_ALL_POST
} from './actionType'

function getAll(posts) {
    return {
        type: GET_POST_FROM_CATEGORY,
        posts
    }
}

function getAllPosts(posts) {
    return {
        type: GET_ALL_POST,
        posts
    }
}

export function getPostsInCategory(category) {
    return dispatch => {
        return getCategoryPosts(category).then(data =>
            dispatch(getAll(data)))
    }
}

export function getAllCategoryPosts() {
    return dispatch => {
        return getPosts().then(data =>
            dispatch(getAllPosts(data)))
    }
}