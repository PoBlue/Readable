import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllCategory } from '../actions/category'
import { getPostsInCategory, getAllCategoryPosts } from '../actions/post'
import PostList from './postList'

class CategoryList extends Component {
    componentDidMount() {
        this.props.getAllCategory();
        this.props.getAllPosts();
    }

    render() {
        let { allCategories } = this.props;
        if(!allCategories) return null;

        return (
            <div id="categories">
                <PostList category='react'/>
                <PostList category='redux'/>
            </div>
        )
    }
}

function mapStateToProps({ categories }) {
    return {
        allCategories: categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCategory: () => dispatch(getAllCategory()),
        getPostsInCategory: (category) => dispatch(getPostsInCategory(category)),
        getAllPosts: () => dispatch(getAllCategoryPosts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);