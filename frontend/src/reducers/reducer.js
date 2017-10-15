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

function posts(state = [], action) {
    switch (action.type) {
        case GET_POST_FROM_CATEGORY:
            return action.posts
        case GET_ALL_POST:
            console.log(action.posts)
            return action.posts
        default:
            return state
    }
}

function comments(state = [], action) {
    switch (action.type) {
        case GET_ALL_COMMENT:
            return state.concat(action.comments)
        default:
            return state
    }
}

const rootReducer = combineReducers({
    categories, posts, comments
})

export default rootReducer;