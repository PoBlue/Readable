import React, { Component } from 'react';
import * as API from './api/Api'
import * as Util from './util/Util'
import CategoryList from './component/categoryList'
import Category from './component/category'
import PostDetail from './component/postDetail'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  mapPostDispatchToProps,
  mapCommentDispatchToProps,
  combineDispatch
} from './dispatches/dispatches'
// import './css/bootstrap.css';
import './css/style.css';

class App extends Component {
  componentWillMount() {
    this.props.getAllPosts();
  }

  getAllComment() {
    const posts = this.props.posts;
    if (!posts) return;
    Object.keys(posts).map((key) => {
      if (key === "detailPost") return;
      posts[key].map((post) => {
        this.props.getAllCommentsInPost(post)
      })
    })
  }

  render() {
    this.getAllComment();
    return (
      <div className="App">
        <Route exact path="/" render={() =>
          <CategoryList/>
        }/>
        <Route exact path="/:category" render={() =>
          <Category/>
        }/>
        <Route exact path="/post/:postId/detail" render={() => 
          <PostDetail/>
        }/>
      </div>
    );
  }
}

function mapStateToProps({posts}) {
    return {
        posts
    }
}

export default withRouter(connect(mapStateToProps,
  combineDispatch(mapPostDispatchToProps, mapCommentDispatchToProps))(App));
