import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from './commentList';
import { 
    getPostsInCategory,
    getAllCategoryPosts,
    deletePostAction,
    updatePostAction,
    createPostAction
} from '../actions/post'
import { getAllComments } from '../actions/comment'
import Post from './post'

class PostList extends Component {
    componentWillMount() {
        let { posts, category } = this.props;
        this.props.getPostsInCategory(category)
    }

    render() {
        let { posts, category, createPost } = this.props;
        const allPosts = posts[category];
        if(!allPosts) return ('');

        return (
            <div id="post-list">
                <h1>Post</h1>
                {posts[category].map((post) =>
                    <Post key={post.id} post={post}/>
                )}
            </div>
        );
    }
}

function mapStateToProps({posts}) {
    return {
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: () => dispatch(getAllCategoryPosts()),
        getPostsInCategory: (category) => dispatch(getPostsInCategory(category)),
        getAllCommentsInPost: (post) => dispatch(getAllComments(post)),
        createPost: (post) => dispatch(createPostAction(post)),
        deletePost: (post) => dispatch(deletePostAction(post)),
        updatePost: (post) => dispatch(updatePostAction(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)