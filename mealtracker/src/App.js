import React, { Component } from 'react';
import logo from './logo.svg';
import { SelectField, MenuItem, FlatButton, AppBar } from 'material-ui';
import './App.css';
import TopBar from './TopBar.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
