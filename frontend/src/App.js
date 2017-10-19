import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as API from './api/Api'
import * as Util from './util/Util'
import CategoryList from './component/categoryList'
import Category from './component/category'
import PostDetail from './component/postDetail'
import { Route } from 'react-router-dom';

class App extends Component {

  render() {
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

export default App;
