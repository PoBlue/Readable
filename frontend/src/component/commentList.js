import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllComments } from '../actions/comment'

class CommentList extends Component {
    componentDidMount() {
        //get comment
        const { getAllComments, post } = this.props;
        getAllComments(post);
    }

    render() {
        const { comments } = this.props;
        return (
            <div id="comment"></div>
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
        getAllComments: (post) => dispatch(getAllComments(post))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);