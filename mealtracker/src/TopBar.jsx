import React, { Component } from 'react';
import logo from './logo.svg';
import { SelectField, MenuItem, FlatButton, AppBar } from 'material-ui';


class TopBar extends Component {
  render() {
    return (
      <AppBar title="Mealest" iconClassNameRight="muidocs-icon-navigation-expand-more"
/>
    );
  }
}

export default TopBar;
