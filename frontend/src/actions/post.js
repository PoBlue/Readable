import { 
    getCategoryPosts,
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getPostDetail,
    votePost
} from '../api/Api'
import {
    GET_POST_FROM_CATEGORY,
    GET_ALL_POST,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    GET_POST_DETAIL,
    VOTE_POST
} from './actionType'

function getAll(posts, category) {
    return {
        type: GET_POST_FROM_CATEGORY,
        posts,
        category
    }
}

function getAllPosts(posts) {
    return {
        type: GET_ALL_POST,
        posts
    }
}

function create(post) {
    return {
        type: CREATE_POST,
        post
    }
}

function update(post) {
    return {
        type: UPDATE_POST,
        post
    }
}

function deleteP(post) {
    return {
        type: DELETE_POST,
        post
    }
}

function detail(post) {
    return {
        type: GET_POST_DETAIL,
        post
    }
}

function vote(post) {
    return {
        type: VOTE_POST,
        post
    }
}

export function getPostsInCategory(category) {
    return dispatch => {
        return getCategoryPosts(category).then(data =>
            dispatch(getAll(data, category)))
    }
}

export function getAllCategoryPosts() {
    return dispatch => {
        return getPosts().then(data => dispatch(getAllPosts(data)))
    }
}

export function createPostAction(post) {
    return dispatch => {
        return createPost(post).then(data => {
            dispatch(create(post))
        })
    }
}

export function updatePostAction(post) {
    return dispatch => {
        return updatePost(post).then(data => dispatch(update(post)))
    }
}

export function deletePostAction(post) {
    return dispatch => {
        return deletePost(post).then(data => {
            dispatch(deleteP(post))
        })
    }
}

export function getPostDetailAction(postId) {
    return dispatch => {
        return getPostDetail(postId).then(data =>{
            dispatch(detail(data))
        })
    }
}

export function votePostAction(post, isUp) {
    return dispatch => {
        return votePost(post, isUp).then(data => {
            dispatch(vote(data))
        })
    }
}