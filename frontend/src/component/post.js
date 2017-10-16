import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './comment';
import { 
    getPostsInCategory,
    getAllCategoryPosts
} from '../actions/post'

class Post extends Component {
    componentDidMount() {
        const { getPostsInCategory, category, getAllPosts } = this.props;
        //get post
        getPostsInCategory(category);
    }

    render() {
        let { posts, category } = this.props;
        if(!posts[category]) return null;

        return (
            <div id="post">
                {posts[category].map((post) => <Comment key={post.id} post={post}/>)}
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
        getAllPosts: () => dispatch(getAllCategoryPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)