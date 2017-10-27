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
        let { post, comments } = this.props;
        if(!post) return 'loding';
        const { id, author, body,
                category, timestamp, title, 
                voteScore } = post
        let postComment = comments[id]? comments[id] : [];

        return (
            <div id="post-detail">
                <h1>{title}</h1>
                <button onClick={_ => this.props.history.goBack()}>Go Back</button>
                <div id="detail">
                    <p>{body}</p>
                    <p className="font-small">
                        In Category: <span className="description">{category}</span><br />
                        Write By: <span className="description">{author}</span>
                    </p>
                </div>
                <div className="vote-score">
                    <p>Post Vote Score: <span className="score">{voteScore}</span></p>
                    <VoteButton setVote={this.setVote.bind(this)} />
                </div>
                {/*<textarea name="post-content" id="post-content"
                    cols="30" rows="10"
                    defaultValue={body}
                    disabled
                />*/}
                <h2>Comment</h2>
                <p className="font-small">
                    Total Comment Count: <span className="description">{postComment.length}</span><br />
                </p>
                <CommentList post={post}/>
            </div>
        )
    }
}

function mapStateToPorps({ posts, comments }) {
    return {
        post: posts.detailPost,
        comments
    }
}

export default withRouter(connect(mapStateToPorps, mapPostDispatchToProps)(PostDetail));