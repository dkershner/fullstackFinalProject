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
  constructor(props){
      super(props)
      this.state={
          selectedRows: []
      }

      this.handleRowSelection=this.handleRowSelection.bind(this)
    }

    dateString(date){
      return date.getMonth() + '-' + date.getUTCDate() + '-' + date.getYear()
    }

  handleRowSelection(selected) {
    this.setState({selectedRows: selected}, () => {this.props.callbackFromParent(selected)})
  }

  isSelected = (index) => {
    return this.state.selectedRows.indexOf(index) !== -1;
  }

  buildComps(meals) {
    return _.map(meals, (meal, i) => (<Meal selected={this.isSelected(i)} key={meal._id} {...meal}/>))
  }
  render() {
    return (
      <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Meal Name</TableHeaderColumn>
            <TableHeaderColumn>Calories</TableHeaderColumn>
            <TableHeaderColumn>Carbs</TableHeaderColumn>
            <TableHeaderColumn>Time</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {this.buildComps(this.props.meals)}
        </TableBody>
      </Table>
    );
  }
}
export default MealList;
