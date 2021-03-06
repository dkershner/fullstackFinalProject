import React, { Component } from 'react';
import logo from './logo.svg';
import { ToolbarGroup, SelectField, MenuItem, FlatButton, AppBar } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { GoogleLogin } from 'react-google-login';

// The nav bar at the top of our site
const Logged = (props) => (
  <IconMenu
    {...props}
     iconButtonElement={
      <IconButton><Menu color="white"/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Dashboard" />
    <MenuItem primaryText="Sign out" />

  </IconMenu>
);

const responseGoogle = (response) => {
  console.log(response)

}

class TopBar extends Component {
  constructor(props){
      super(props)
      this.dropDown=this.dropDown.bind(this)
    }
    dropDown(e, obj) {
      console.log("In dropDown")
    }
  render() {
    return (
      <div>
        <AppBar title="Mealest" iconElementLeft={<Logged />} onLeftButtonClick={this.dropDown}/>
      </div>

    );
  }
}

export default TopBar;
