import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    OPTION_TIME,
    OPTION_VOTE
 } from './constant'
import { getPostsInCategory } from '../actions/post'
import { mapPostDispatchToProps } from '../dispatches/dispatches'
import { connect } from 'react-redux'
import PostList from './postList'
import SortSelector from './sortSelector'
import NotFound404 from './404page'

class Category extends Component {
    componentDidMount() {
        let categoryName = this.props.match.params.category
    }

    state = {
        sortby: OPTION_VOTE
    }

    updateSortby(sortby) {
        this.setState(sortby);
    }

    contains(name) {
        for (var i = 0; i < this.props.allCategories.length; i++) {
            if (this.props.allCategories[i] === name) {
                return true;
            }
        }
        return false;
    }

    render() {
        const categoryName = this.props.match.params.category
        if(!this.contains(categoryName)) return (<NotFound404 message={"no this category:)"}/>);

        return (
            <div id="category">
                <h1>{categoryName}</h1>
                <div className="center-wrapper">
                    <button className="back-button" onClick={_ => this.props.history.goBack()}>Go Back</button>
                </div>
                <h2>Post</h2>
                <div className="center-wrapper">
                    <SortSelector sortby={this.state.sortby} updateSortby={this.updateSortby.bind(this)} />
                </div>
                <PostList category={categoryName} sortby={this.state.sortby}/>
            </div>
        )
    }
}

function mapStateToProps({ categories }) {
    return {
        allCategories: categories,
    }
}


export default withRouter(connect(mapStateToProps, mapPostDispatchToProps)(Category))