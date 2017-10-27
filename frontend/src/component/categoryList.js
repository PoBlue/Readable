import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllCategory } from '../actions/category'
import { getPostsInCategory, getAllCategoryPosts } from '../actions/post'
import { mapCategoryDispatchToProps } from '../dispatches/dispatches'
import { Link } from 'react-router-dom';
import PostList from './postList'
import {
    OPTION_TIME,
    OPTION_VOTE
 } from './constant'
import SortSelector from './sortSelector'

class CategoryList extends Component {
    componentDidMount() {
        this.props.getAllCategory();
    }

    state = {
        sortby: OPTION_VOTE
    }

    updateSortby(sortby) {
        this.setState(sortby);
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
                <h2>All Post</h2>
                <div className="center-wrapper">
                    <SortSelector sortby={this.state.sortby} updateSortby={this.updateSortby.bind(this)} />
                </div>
                <PostList sortby={this.state.sortby}/>
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

export default connect(mapStateToProps, mapCategoryDispatchToProps)(CategoryList);