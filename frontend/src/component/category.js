import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    OPTION_TIME,
    OPTION_VOTE
 } from './constant'
import { getPostsInCategory } from '../actions/post'
import { connect } from 'react-redux'
import PostList from './postList'

class Category extends Component {
    componentDidMount() {
        let categoryName = this.props.match.params.category
    }

    state = {
        sortby: OPTION_VOTE
    }

    selectHandler(event) {
        let selectValue = event.target.value;
        this.setState({ sortby: selectValue });
    }

    render() {
        const categoryName = this.props.match.params.category
        return (
            <div id="category">
                <h1>{categoryName}</h1>
                <button onClick={_ => this.props.history.goBack()}>Go Back</button>
                <select name="sort" id="sort"
                    value={this.state.sortby}
                    onChange={(event) => this.selectHandler(event)}>
                    <option value="sortby" disabled>sort by</option>
                    <option value={OPTION_TIME}>time</option>
                    <option value={OPTION_VOTE}>vote</option>
                </select>
                <PostList category={categoryName} sortby={this.state.sortby}/>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPostsInCategory: (category) => dispatch(getPostsInCategory(category)),
    }
}

export default withRouter(connect(undefined,mapDispatchToProps)(Category))