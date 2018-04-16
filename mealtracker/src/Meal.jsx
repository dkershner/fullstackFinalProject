import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

// A table row for the MealList that represents a single meal.
class Meal extends Component {
  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.name}</TableRowColumn>
        <TableRowColumn>{this.props.cals}</TableRowColumn>
        <TableRowColumn>{this.props.carbs}</TableRowColumn>
        <TableRowColumn>{this.props.time}</TableRowColumn>
      </TableRow>

    );
  }
}
export default Meal;
