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
    const {...other } = this.props;
    return (
      <TableRow {...other}>
        {other.children[0]}
        <TableRowColumn>{this.props.name}</TableRowColumn>
        <TableRowColumn>{this.props.calories}</TableRowColumn>
        <TableRowColumn>{this.props.carbs}</TableRowColumn>
        <TableRowColumn>{this.props.time}</TableRowColumn>
      </TableRow>

    );
  }
}
export default Meal;
