import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';


class GoogleLogin extends Component{
  constructor (props){
    super(props)
    this.state={
      clientId="1042868149379-bg9ir7fla3qqpfpl728229jen3l06emg.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    }
  }
}

export default GoogleLogin;
