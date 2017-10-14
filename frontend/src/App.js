import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as API from './api/Api'
import * as Util from './util/Util'

class App extends Component {
  componentDidMount() {
    API.getCategories().then((data) => {
      API.getCategoryPosts(data[0]).then((posts) => {
        API.getPostDetail(posts[0]).then((detail) => {
          console.log(detail)
        })
        console.log(Util.uuidv4())
      })
    });

    // API.createPost({
    //   "id": 123473829105783,
    //   "timestamp": Date.now(),
    //   "title": "for fun",
    //   "body": "for test",
    //   "author": "wither_mo",
    //   "category": "react"
    // }).then((data)=>console.log(data));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
