import React, { Component } from 'react';
import { connect } from 'react-redux'
import Comment from './comment'
import {mapCommentDispatchToProps} from '../dispatches/dispatches'
import {
    OPTION_TIME,
    OPTION_VOTE
} from './constant'
import SortSelector from './sortSelector'

class CommentList extends Component {
    componentDidMount() {
        //get comment
        const { getAllComments, post } = this.props;
        this.props.getAllCommentsInPost(post);
    }

    clickHanlder() {
        const commentNew = {
                id: '8tu4bsun805n8un48ve89',
                parentId: "8xf0y6ziyjabvozdd253nd",
                timestamp: 1469479767190,
                body: 'Comments. Are. Cool.',
                author: 'thingone',
                voteScore: -5,
                deleted: false,
                parentDeleted: false
        }
        this.props.createComment(commentNew)
    }

    state = {
        sortby: OPTION_VOTE
    }

    updateSortby(sortby) {
        this.setState(sortby);
    }

    render() {
        const { comments, post } = this.props;
        if(!comments[post.id]) return "loding";

        return (
            <div id="comment-list">
                <SortSelector sortby={this.state.sortby} updateSortby={this.updateSortby.bind(this)}/>
                {comments[post.id].map((comment) => (
                    <Comment key={comment.id} comment={comment}/>
                ))}
                <button onClick={this.clickHanlder.bind(this)}>create comment</button>
            </div>
        );
    }
}

function mapStateToProps({ comments }) {
    return {
        comments
    };
}

export default connect(mapStateToProps, mapCommentDispatchToProps)(CommentList);