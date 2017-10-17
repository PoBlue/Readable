import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
    getAllComments,
    updateCommentAction,
    deleteCommentAction,
    createCommentAction
} from '../actions/comment'

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

    render() {
        const { comments } = this.props;
        return (
            <div id="comment">
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

function mapDispatchToProps(dispatch) {
    return {
        getAllCommentsInPost: (post) => dispatch(getAllComments(post)),
        createComment: (comment) => dispatch(createCommentAction(comment)),
        deleteComment: (comment) => dispatch(deleteCommentAction(comment)),
        updateComment: (comment) => dispatch(updateCommentAction(comment))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);