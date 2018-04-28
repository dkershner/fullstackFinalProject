import React, { Component } from 'react';
import logo from './logo.svg';
import { SelectField, MenuItem, FlatButton, AppBar } from 'material-ui';
import Splash from './Splash.js';
import { GoogleLogin } from 'react-google-login';

import TopBar from './TopBar.jsx';
import Dashboard from './Dashboard.jsx';


const CLIENT_ID = '1042868149379-bg9ir7fla3qqpfpl728229jen3l06emg.apps.googleusercontent.com'
const backendUrl = ""



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
