import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllCategory } from '../actions/category'
import Post from './post'

class CategoryList extends Component {
    componentDidMount() {
        this.props.getAllCategory();
    }

    render() {
        let { allCategories } = this.props;
        if(!allCategories) return null;

        return (
            <div id="categories">
                <Post category='react'/>
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
        getAllCategory: () => dispatch(getAllCategory())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);