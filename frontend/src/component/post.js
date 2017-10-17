import React, { Component } from 'react';
import CommentList from './commentList'

class Post extends Component {
    render() {
        return (
            <div id="post">
                <CommentList post={this.props.post}/>
            </div>
    )}
}

export default Post;