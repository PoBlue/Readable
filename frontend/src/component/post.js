import React, { Component } from 'react';
import CommentList from './commentList'
import { getTimeFromDate } from '../util/Util'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {mapPostDispatchToProps} from '../dispatches/dispatches'
import PostForm from './postForm'

class Post extends Component {
    render() {
        const { post } = this.props
        const { title, author, voteScore, timestamp, id } = post
        return (
            <div id="post">
                <h3>{title}</h3>
                <ul>
                    <li>
                        <b>author:</b>{author}<br />
                    </li>
                    <li>
                        <b>voteScore: </b>{voteScore}<br />
                    </li>
                    <li>
                        <b>timestamp: </b>{timestamp}<br />
                    </li>
                </ul>
                <button onClick={() => this.props.deletePost(post)}>delete</button>
                <br/>
                <PostForm category={post.category} post={post} editorMode={true}></PostForm>
                <Link to={`/post/${id}/detail`}>detail</Link>
            </div>
        )
    }
}

export default connect(undefined, mapPostDispatchToProps)(Post);