import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllCategory } from '../actions/category'
import { getPostsInCategory, getAllCategoryPosts } from '../actions/post'
import { Link } from 'react-router-dom';
import PostList from './postList'

class CategoryList extends Component {
    componentDidMount() {
        this.props.getAllCategory();
        this.props.getAllPosts();
    }

    render() {
        let { allCategories, posts } = this.props;
        if(!allCategories) return null;

        return (
            <div id="categories">
                <h1>Category</h1>
                <div className="category-list">
                    <ul>
                        {allCategories.map(
                            (category) => (
                                <li key={category} className="category">
                                    <Link to={`/${category}`}>
                                        {category}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ categories, posts }) {
    return {
        allCategories: categories,
        allPost: posts
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