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
    DELETE_COMMENT
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
                    posts[post.category].push(post);
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
                    posts[post.category].push(post);
                }
                return posts
            }, {});
        case CREATE_POST: {
            const { post } = action;
            state[post.category].push(post);
            return state;
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
            if(!state[comment.parentId]) {
                state[comment.parentId] = [comment]
            } else {
                state[comment.parentId].push(comment);
            }
            return state;
        }
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