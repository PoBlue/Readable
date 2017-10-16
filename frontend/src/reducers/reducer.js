import { combineReducers } from 'redux'
import { 
    GET_ALL_CATEGORY,
    GET_POST_FROM_CATEGORY,
    GET_ALL_POST,
    GET_ALL_COMMENT
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
function posts(state = [], action) {
    switch (action.type) {
        case GET_POST_FROM_CATEGORY:
            const { posts, category } = action;
            const newState = {
                ...state,
                [category]: posts
            }
            return newState
        case GET_ALL_POST:
            return action.posts
        default:
            return state
    }
}

/*
    {
        postKey: [comments]
    }
*/
function comments(state = [], action) {
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