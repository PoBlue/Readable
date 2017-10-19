import React, { Component } from 'react';
import VoteButton from './voteButton'
import {mapCommentDispatchToProps} from '../dispatches/dispatches'
import { connect } from 'react-redux'

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
                <VoteButton setVote={this.setVote.bind(this)}/>
                <div className="vote-score">{voteScore}</div>
            </div>
        )
    }
}

export default connect(undefined, mapCommentDispatchToProps)(Comment);