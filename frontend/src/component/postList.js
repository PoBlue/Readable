import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from './commentList';
import { mapPostDispatchToProps } from '../dispatches/dispatches'
import { getAllComments } from '../actions/comment'
import Post from './post'
import PostForm from './postForm'
import {sortObjectArrayByKey}  from '../util/Util'

class PostList extends Component {
    render() {
        let { posts, category, createPost } = this.props;
        let allPosts = [];
        if (category) {
            allPosts = posts[category];
        } else {
            allPosts = Object.keys(posts).reduce((lastPosts, key) => {
                if (key === "detailPost") return lastPosts;
                return lastPosts.concat(posts[key])
            }, [])
        }
        if(!allPosts) allPosts=[];
        sortObjectArrayByKey(allPosts, this.props.sortby)

        return (
            <div id="post-list">
                <div className="center-wrapper">
                    <PostForm category={category} buttonName={"create post"}></PostForm>
                </div>
                {allPosts.map((post) =>
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