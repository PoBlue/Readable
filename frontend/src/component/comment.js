import React, { Component } from 'react';
import VoteButton from './voteButton'
import {mapCommentDispatchToProps} from '../dispatches/dispatches'
import { connect } from 'react-redux'
import CommentForm from './commentForm'

class Comment extends Component {
    setVote(isUp) {
        this.props.voteComment(this.props.comment, isUp)
    }

    render() {
        const { comment } = this.props;
        const { body, id, parentId,
                timestamp, voteScore, author } = comment
        return (
            <div id="comment">
                <p>{body}</p>
                <div className="vote-score">{voteScore}</div>
                <VoteButton setVote={this.setVote.bind(this)}/>
                <button onClick={() => this.props.deleteComment(comment)}>delete</button>
                <CommentForm postId={comment.parentId} comment={comment} editorMode={true}/>
            </div>
        )
    }
}

export default connect(undefined, mapCommentDispatchToProps)(Comment);