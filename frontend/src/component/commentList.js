import React, { Component } from 'react';
import { connect } from 'react-redux'
import Comment from './comment'
import {mapCommentDispatchToProps} from '../dispatches/dispatches'
import {
    OPTION_TIME,
    OPTION_VOTE
} from './constant'
import SortSelector from './sortSelector'
import CommentForm from './commentForm'
import {sortObjectArrayByKey}  from '../util/Util'

class CommentList extends Component {
    componentDidMount() {
        //get comment
        const { getAllComments, post } = this.props;
        this.props.getAllCommentsInPost(post);
    }

    state = {
        sortby: OPTION_VOTE
    }

    updateSortby(sortby) {
        this.setState(sortby);
    }

    render() {
        const { comments, post } = this.props;
        let allComments = comments[post.id]
        if(!allComments) allComments=[];
        sortObjectArrayByKey(allComments, this.state.sortby)

        return (
            <div id="comment-list">
                <SortSelector sortby={this.state.sortby} updateSortby={this.updateSortby.bind(this)}/>
                {allComments.map((comment) => (
                    <Comment key={comment.id} comment={comment}/>
                ))}
                <CommentForm postId={post.id}/>
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