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


class MealList extends Component {
  buildComps(meals) {
    return _.map(meals, meal => (<Meal key={meal.meal + meal.name} {...meal}/>))
  }
  render() {
    return (
      <div>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Meal Name</TableHeaderColumn>
            <TableHeaderColumn>Calories</TableHeaderColumn>
            <TableHeaderColumn>Carbs</TableHeaderColumn>
            <TableHeaderColumn>Time</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.buildComps(this.props.meals)}
        </TableBody>
      </Table>
      </div>


    );
  }
}
export default MealList;
