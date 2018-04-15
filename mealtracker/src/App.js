import React, { Component } from 'react';
import logo from './logo.svg';
import { SelectField, MenuItem, FlatButton, AppBar } from 'material-ui';

import TopBar from './TopBar.jsx';
import Dashboard from './Dashboard.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar/>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
