import React, { Component } from 'react';
import * as API from './api/Api'
import * as Util from './util/Util'
import CategoryList from './component/categoryList'
import Category from './component/category'
import PostDetail from './component/postDetail'
import  NotFound404 from './component/404page'
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  mapPostDispatchToProps,
  mapCommentDispatchToProps,
  mapCategoryDispatchToProps,
  combineDispatch,
} from './dispatches/dispatches'
// import './css/bootstrap.css';
import './css/style.css';

class App extends Component {
  componentWillMount() {
    this.props.getAllPosts();
    this.props.getAllCategory();
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
        <Switch>
          <Route exact path="/" render={() =>
            <CategoryList/>
          }/>
          <Route exact path="/:category" render={() =>
            <Category/>
          }/>
          <Route exact path="/post/:postId/detail" render={() => 
            <PostDetail/>
          }/>
          <Route path="*" render={() =>
            <NotFound404 message={"404 Not Found"}/>
          }/>
        </Switch>
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
  combineDispatch(combineDispatch(mapPostDispatchToProps,
    mapCommentDispatchToProps),
    mapCategoryDispatchToProps))(App));
