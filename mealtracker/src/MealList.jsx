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
  state = {
    selectedMeals: []
  }

  dateString(date){
    return date.getMonth() + '-' + date.getDay() + '-' + date.getYear()
  }

  handleRowSelection = (selectedRows) => {
    this.setState({
      selectedMeals: selectedRows
    })
    console.log("Selected meals: " + this.state.selectedMeals)
  }

  handleDelete = () => {
      this.state.selectedMeals.map(meal => {
        fetch('http://ec2-18-191-0-236.us-east-2.compute.amazonaws.com:3000/' + this.dateString(meal.date), {method: 'DELETE'})
      })
      this.setState({selectedMeals:[]})
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps
    if (this.props.shouldDelete === true) {
      this.handleDelete()
      this.props.shoudDelete = false
    }
  }

  buildComps(meals) {
    return _.map(meals, meal => (<Meal key={meal._id} {...meal}/>))
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
        <TableBody>
          {this.buildComps(this.props.meals)}
        </TableBody>
      </Table>
    );
  }
}
export default MealList;
