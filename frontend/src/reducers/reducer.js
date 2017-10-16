import { combineReducers } from 'redux'
import { 
    GET_ALL_CATEGORY,
    GET_POST_FROM_CATEGORY,
    GET_ALL_POST,
    GET_ALL_COMMENT,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST
 } from '../actions/actionType'

function categories(state = [], action) {
    switch (action.type) {
        case GET_ALL_CATEGORY:
            return action.categories.reduce((categories, category) => {
                categories[category.name] = category.path
                return categories
            }, {})
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
            const { posts, category } = action;
            const newState = {
                ...state,
                [category]: posts
            }
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
            const { comments, post } = action
            const newState = {
                ...state,
                [post.id]: comments
            }

            return newState
        default:
            return state
    }
}

const rootReducer = combineReducers({
    categories, posts, comments
})

export default rootReducer;