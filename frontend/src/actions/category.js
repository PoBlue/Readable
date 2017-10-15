import { getCategories } from '../api/Api'
import { GET_ALL_CATEGORY } from './actionType'

function getAll(categories) {
    return {
        type: GET_ALL_CATEGORY,
        categories
    }
}

export function getAllCategory() {
    return dispatch => {
        return getCategories().then(data =>
            dispatch(getAll(data)))
    }
}