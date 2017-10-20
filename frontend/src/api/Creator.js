import {uuidv4} from '../util/Util'

export function commentCreator(body, author, postId) {
    return {
        id: uuidv4(),
        parentId: postId,
        timestamp: Date.now(),
        body,
        author,
        voteScore: 1,
        deleted: false,
        parentDeleted: false
    }
}

export function postCreator(body, author, title, category) {
    return {
        id: uuidv4(),
        timestamp: Date.now(),
        body,
        author,
        title,
        category,
        voteScore: 1,
        deleted: false,
    }
}