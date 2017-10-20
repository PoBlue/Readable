import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from './commentList';
import { mapPostDispatchToProps } from '../dispatches/dispatches'
import { getAllComments } from '../actions/comment'
import Post from './post'
import PostForm from './postForm'
import {sortObjectArrayByKey}  from '../util/Util'

class PostList extends Component {
    componentWillMount() {
        let { posts, category } = this.props;
        this.props.getPostsInCategory(category)
    }

    render() {
        let { posts, category, createPost } = this.props;
        let allPosts = posts[category];
        if(!allPosts) allPosts=[];
        sortObjectArrayByKey(allPosts, this.props.sortby)

        return (
            <div id="post-list">
                <h2>Post</h2>
                {allPosts.map((post) =>
                    <Post key={post.id} post={post}/>
                )}
                <PostForm category={category}></PostForm>
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