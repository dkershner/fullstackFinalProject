import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Meal from './Meal.jsx';
import _ from 'lodash';


// Creates a table for all the meals on a given date
class MealList extends Component {
  buildComps(meals) {
    return _.map(meals.meals, meal => (<Meal key={meal._id} {...meal}/>))
  }
  render() {
    return (
      <div>
      <Table>
        <TableHeader adjustForCheckbox={true}>
          <TableRow>
            <TableHeaderColumn>Meal Name</TableHeaderColumn>
            <TableHeaderColumn>Calories</TableHeaderColumn>
            <TableHeaderColumn>Carbs</TableHeaderColumn>
            <TableHeaderColumn>Time</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody >
          {this.buildComps(this.props.meals)}
        </TableBody>
      </Table>
      </div>

    );
  }
}
export default MealList;
