import React, { Component } from 'react';
import CommentList from './commentList'
import { getTimeFromDate } from '../util/Util'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {mapPostDispatchToProps} from '../dispatches/dispatches'
import PostForm from './postForm'
import VoteButton from './voteButton'

class Post extends Component {
    render() {
        const { post, comments } = this.props
        const { title, author, voteScore, timestamp, id } = post
        let postComment = comments[id]? comments[id] : [];
        return (
            <div id="post">
                <h3>{title}</h3>
                <ul>
                    <li>
                        <b>author:</b> {author} <br/>
                    </li>
                    <li>
                        <b>timestamp: </b> {getTimeFromDate(timestamp)} <br/>
                    </li>
                    <li>
                        <b>comments count: </b> {postComment.length} <br/>
                    </li>
                    <li>
                        <p>Post Vote Score: <span className="score">{voteScore}</span></p>
                        <VoteButton setVote={(isUp) => this.props.votePost(this.props.post, isUp)} />
                    </li>
                </ul>
                <Link to={`/post/${id}/detail`}>detail</Link>
                <div id="post-button">
                    <PostForm category={post.category} post={post} editorMode={true}></PostForm>
                    <button onClick={() => this.props.deletePost(post)}>delete</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ comments }) {
    return {
        comments
    }
}

export default connect(mapStateToProps, mapPostDispatchToProps)(Post);