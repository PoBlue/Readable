import { 
    getPostsInCategory,
    getAllCategoryPosts,
    deletePostAction,
    updatePostAction,
    createPostAction,
    getPostDetailAction,
    votePostAction
} from '../actions/post'

import {
    getAllComments,
    updateCommentAction,
    deleteCommentAction,
    createCommentAction,
    voteCommentAction
} from '../actions/comment'

import { getAllCategory } from '../actions/category'

export function mapCommentDispatchToProps(dispatch) {
    return {
        getAllCommentsInPost: (post) => dispatch(getAllComments(post)),
        createComment: (comment) => dispatch(createCommentAction(comment)),
        deleteComment: (comment) => dispatch(deleteCommentAction(comment)),
        updateComment: (comment) => dispatch(updateCommentAction(comment)),
        voteComment: (comment, isUp) => dispatch(voteCommentAction(comment, isUp))
    };
}

export function mapCategoryDispatchToProps(dispatch) {
    return {
        getAllCategory: () => dispatch(getAllCategory()),
        getAllPosts: () => dispatch(getAllCategoryPosts()),
    }
}

export function mapPostDispatchToProps(dispatch) {
    return {
        getAllPosts: () => dispatch(getAllCategoryPosts()),
        getPostsInCategory: (category) => dispatch(getPostsInCategory(category)),
        getAllCommentsInPost: (post) => dispatch(getAllComments(post)),
        createPost: (post) => dispatch(createPostAction(post)),
        deletePost: (post) => dispatch(deletePostAction(post)),
        updatePost: (post) => dispatch(updatePostAction(post)),
        getPostDetail: (postId) => dispatch(getPostDetailAction(postId)),
        votePost: (post, isUp) => dispatch(votePostAction(post, isUp))
    }
}

export function combineDispatch(dispatchFun1, dispatchFun2) {
    return function(dispatch) {
        return {...dispatchFun1(dispatch), ...dispatchFun2(dispatch)}
    }
}