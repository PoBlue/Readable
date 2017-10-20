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
                <div>
                    <p>{body}</p>
                    <p className="font-small">
                        Write By: <span className="description">{author}</span>
                    </p>
                </div>
                <div>
                    <p>Post Vote Score: <span className="score">{voteScore}</span></p>
                    <VoteButton setVote={this.setVote.bind(this)} />
                </div>
                <button onClick={() => this.props.deleteComment(comment)}>delete</button>
                <CommentForm postId={comment.parentId} comment={comment} editorMode={true}/>
            </div>
        )
    }
}

export default connect(undefined, mapCommentDispatchToProps)(Comment);