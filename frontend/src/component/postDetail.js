import React, { Component } from 'react';
import CommentList from './commentList'
import { getTimeFromDate } from '../util/Util'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { getPostDetailAction } from '../actions/post'
import { mapPostDispatchToProps } from '../dispatches/dispatches'
import VoteButton from './voteButton'

class PostDetail extends Component {
    componentDidMount() {
        let postId = this.props.match.params.postId;
        this.props.getPostDetail(postId)
    }

    setVote(isUp) {
        this.props.votePost(this.props.post, isUp)
    }

    render() {
        let post = this.props.post;
        if(!post) return 'loding';
        const { id, author, body,
                category, timestamp, title, 
                voteScore } = post

        return (
            <div id="post-detail">
                <button onClick={_ => this.props.history.goBack()}>Go Back</button>
                <h1>{title}</h1>
                <h2>{category}</h2>
                <h3>{author}</h3>
                <h3>{voteScore}</h3>
                <VoteButton setVote={this.setVote.bind(this)}/>
                <textarea name="post-content" id="post-content"
                    cols="30" rows="10"
                    defaultValue={body}
                    disabled
                />
                <h2>Comment</h2>
                <CommentList post={post}/>
            </div>
        )
    }
}

function mapStateToPorps({ posts }) {
    return {
        post: posts.detailPost
    }
}

export default withRouter(connect(mapStateToPorps, mapPostDispatchToProps)(PostDetail));