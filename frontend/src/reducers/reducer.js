import { combineReducers } from 'redux'
import { 
    GET_ALL_CATEGORY,
    GET_POST_FROM_CATEGORY,
    GET_ALL_POST,
    GET_ALL_COMMENT,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    VOTE_COMMENT,
    GET_POST_DETAIL,
    VOTE_POST
 } from '../actions/actionType'
 import { contains } from '../util/Util'

function categories(state = [], action) {
    switch (action.type) {
        case GET_ALL_CATEGORY:
            return action.categories.reduce((categories, category) => {
                categories.push(category.path)
                return categories
            }, [])
        default:
            return state
    }
}

/*
    {
        categoryKey: [posts]
        detailPost: post
    }
*/
function posts(state = {}, action) {
    switch (action.type) {
        case GET_POST_FROM_CATEGORY:
        {
            const newState = action.posts.reduce((posts, post) => {
                if(!(post.category in posts)) {
                    posts[post.category] = [post];
                } else {
                    if (!contains(posts[post.category], post)) {
                        posts[post.category].push(post);
                    }
                }
                return posts
            }, {...state});
            return newState
        }
        case GET_ALL_POST:
            return action.posts.reduce((posts, post) => {
                if(!(post.category in posts)) {
                    posts[post.category] = [post];
                } else {
                    if (!contains(posts[post.category], post)) {
                        posts[post.category].push(post);
                    }
                }
                return posts
            }, {...state});
        case CREATE_POST: {
            const { post } = action;
            let allPost = state[post.category];
            if(!allPost) allPost=[];
            return {
                ...state,
                [post.category]: allPost.concat([post])
            };
        }
        case UPDATE_POST:
        {
            const { post } = action;
            const newPosts = state[post.category].map((oldPost) => {
                if (oldPost.id === post.id) {
                    return post;
                }
                return oldPost;
            });
            const newState = {
                ...state,
                [post.category]: newPosts
            }
            return newState;
        }
        case DELETE_POST:
        {
            const { post } = action;
            const newPosts = state[post.category].filter((oldPost) => {
                return post.id !== oldPost.id
            })
            return {
                ...state,
                [post.category]: newPosts
            }
        }
        case GET_POST_DETAIL:
        {   
            return {
                detailPost: { ...action.post }
            }
        }
        case VOTE_POST: {
            return {
                detailPost: { ...action.post }
            }
        }
        default:
            return state
    }
}

/*
    {
        postKey: [comments]
    }
*/
function comments(state = {}, action) {
    switch (action.type) {
        case GET_ALL_COMMENT:
            return action.comments.reduce((comments, comment) => {
                if(!(comment.parentId in comments)) {
                    comments[comment.parentId] = [comment];
                } else {
                    let postComments = comments[comment.parentId]
                    if (!contains(postComments, comment)){
                        postComments.push(comment);
                    }
                }
                return comments
            }, {...state});
        case CREATE_COMMENT:
        {
            const { comment } = action;
            let allComments = state[comment.parentId];
            if(!allComments) allComments=[];
            return {
                ...state,
                [comment.parentId]: allComments.concat(comment)
            };
        }
        case VOTE_COMMENT:
        case UPDATE_COMMENT:{
            const { comment } = action;
            const newComments = state[comment.parentId].map((oldComment) => {
                if (oldComment.id === comment.id) {
                    return comment;
                }
                return oldComment;
            });
            const newState = {
                ...state,
                [comment.parentId]: newComments
            }
            return newState;
        }
        case DELETE_COMMENT:{
            const { comment } = action;
            const newComments = state[comment.parentId].filter((oldComment) => {
                return comment.id !== oldComment.id
            })
            return {
                ...state,
                [comment.parentId]: newComments
            }
        }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    categories, posts, comments
})

export default rootReducer;