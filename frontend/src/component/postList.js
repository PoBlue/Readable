import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from './commentList';
import { 
    getPostsInCategory,
    getAllCategoryPosts,
    deletePostAction,
    updatePostAction,
    createPostAction
} from '../actions/post'

class Post extends Component {
    componentDidMount() {
        //get post
    }

    clickHanlder() {
        const { getPostsInCategory,
            createPost,
            category,
            deletePost,
            getAllPosts } = this.props;

        let postC = {
            id: '9ni223sga22f2p33lnez',
            timestamp: 1468479767890,
            title: 'react in 1 minutes!',
            body: 'it takes more than 10 minutes to learn technology.',
            author: 'thingone',
            category: 'react',
            voteScore: -5,
            deleted: false
        }
        this.props.createPost(postC)
    }

    render() {
        let { posts, category, createPost } = this.props;
        if(!posts[category]) return ('');
        console.log(posts)

        return (
            <div id="post">
                {posts[category].map((post) => <CommentList key={post.id} post={post}/>)}
                <button onClick={this.clickHanlder.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps({posts}) {
    return {
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPostsInCategory: (category) => dispatch(getPostsInCategory(category)),
        createPost: (post) => dispatch(createPostAction(post)),
        deletePost: (post) => dispatch(deletePostAction(post)),
        updatePost: (post) => dispatch(updatePostAction(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)