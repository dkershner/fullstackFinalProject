import React, { Component } from 'react';
import logo from './logo.svg';
import { SelectField, MenuItem, FlatButton, AppBar } from 'material-ui';
import Splash from './Splash.js';

import TopBar from './TopBar.jsx';
import Dashboard from './Dashboard.jsx';

const CLIENT_ID = '1042868149379-bg9ir7fla3qqpfpl728229jen3l06emg.apps.googleusercontent.com'
const backendUrl = ""


class App extends Component {

//Constructor
  constructor(props){
    super(props)

    this.state = {
        isSignedIn: null,
        googleUser: null,
        serverSession: {}
      }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.refreshSession = this.refreshSession.bind(this)
  }

  refreshSession(){
    // load the session data.
    // pass credentials: 'include' to enable cookies!
    fetch(backendUrl+'/', {credentials: 'include'})
      .then(resp => resp.json())
      .then(resp => {
        console.log("got api root: ", resp)

        // check result first.
        if (resp.result === 'ok'){
          this.setState({serverSession: resp.session})
        } else{
          this.setState({serverSession: {}})
        }
      })
      .catch(err=>console.log("ERROR:", err))

  }

  componentDidMount(){
      this.refreshSession()
      // check if the user is currently logged in...
      if (!this.state.isSignedIn) {
        console.log("app mounted, checking signin")

        // this loads teh google api object
        window.gapi.load('auth2', () => {
          // create a new Oauth2.0 ceredential at console.cloud.google.com
          window.gapi.auth2.init({
            client_id: CLIENT_ID,
            fetch_basic_profile: true
          })
          .then((auth2)=>{
              console.log("auth2.init finished.")
              console.log("isSignedIn: " + auth2.isSignedIn.get().toString())

              //store this auth2 function on the window object
              //maybe better store in react state... not sure.
              window.gapi.auth2 = auth2

              // we can finally ask google if the user is currently signed in
              // or not
              if (auth2.isSignedIn.get()){
                // if they are already logged in, pass to the login code.
                let q = auth2.currentUser.get();
                this.handleLogin(q)
              }else{
                // else trigger the login popup
                this.setState({isSignedIn:false})
              }
            })
          .catch((reason)=>{
            console.log("auth2.init failed with: " + reason.error)
            console.log(reason.details)
          })
        })
      }
  }

  handleLogin(gUser){
    // store the user in the component state
    this.setState({googleUser: gUser, isSignedIn:true})

    //send user to backend!
    //https://developers.google.com/identity/sign-in/web/backend-auth
    let token = gUser.getAuthResponse().id_token
    let body = JSON.stringify({token:token})
    console.log("send to backend", body)
    fetch(backendUrl+'/login', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: body
    })
    .then(rsp => rsp.json())
    .then(rsp => {
      // hopefully everything worked.
      console.log("server login response was", rsp)
      // reget session data from the server (just for demo)
      this.refreshSession()
    })
    .catch(err => {
      console.log("LOGIN FAILED:", err)
    })
  }

  handleLogout(){
    // user cliked the logout button, log them out in the browser
    // and also tell the backend they logged out.
    console.log("got singout click")
    window.gapi.auth2.signOut()
      .then(()=>{
        console.log("signed out!")

        // assume the current user is stored in the backed's session data
        // so we don't have to explicitly add the user to the request
        // (its sent in the cookie)
        fetch(backendUrl+'/logout', {
          credentials: 'include',
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        })
        .then(rsp => rsp.json())
        .then(rsp => {
          console.log("server logut response was", rsp)
          this.setState({ googleUser:null, isSignedIn: false})
          this.refreshSession()
        })
        .catch(err => {
          console.log("LOGOUT FAILED:", err)
        })
      })
  }

  obj_to_list(o){
    // recursive object dump
    if (o === null)
      return "null"
    if (typeof o !== 'object')
      return o.toString()
    let dump = Object.keys(o).map(
      k => {
        return <li key={k}>{k}: {this.obj_to_list(o[k])}</li>
      }
    )
    return <ul>{dump}</ul>
  }

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
