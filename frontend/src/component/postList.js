import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from './commentList';
import { mapPostDispatchToProps } from '../dispatches/dispatches'
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
                <h2>Post</h2>
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

export default connect(mapStateToProps, mapPostDispatchToProps)(PostList)