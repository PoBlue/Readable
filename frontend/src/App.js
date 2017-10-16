import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as API from './api/Api'
import * as Util from './util/Util'
import CategoryList from './component/categoryList'

class App extends Component {

  render() {
    return (
      <div className="App">
        <CategoryList/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
     
    }
}

export default App;
