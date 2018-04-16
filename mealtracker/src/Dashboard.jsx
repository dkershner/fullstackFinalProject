import React, { Component } from 'react';
import logo from './logo.svg';
import { SelectField, MenuItem, RaisedButton, FlatButton, AppBar } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import {Label, Container, Row, Col} from 'reactstrap';
import './App.css';
import MealList from './MealList.jsx';
import _ from "lodash";


class Dashboard extends Component {
  constructor(props){
      super(props)
      this.state={
        date:this.getDate(),
        meals:{}
      }
      this.getDate=this.getDate.bind(this)
      this.changeDate=this.changeDate.bind(this)
      this.mealsForDate=this.mealsForDate.bind(this)
      this.dateString=this.dateString.bind(this)
      }
    getDate() {
      var today = new Date()
      today.setFullYear(today.getFullYear())
      return today
      this.mealsForDate()
    }
    changeDate(e, newDate) {
      this.mealsForDate()
      this.setState({date:newDate})
    }
    dateString(date){
      //Change date to the string server uses
    }
    mealsForDate() {
    var text = this.dateString(this.state.date)
    fetch()
      .then(res => res.json())
      .then(res => {
          if(res.result!=="success"){
            throw Error("Search failed")
          }
          return res.message
       })
       .then(data=> {
         return _(data).map(meal=>{
           const {Name, Cals, Carbs, Time} = meal
           return {
             name: Name,
             cals: Cals,
             carbs: Carbs,
             time: Time
           }
         }).sortBy(['time', 'name', 'cals', 'carbs'])
         .compact().value()
       })
       .then(data => {
         if(data.length != 0) {
            console.log(data)
            this.setState({meals:data})
          }
        }
       )
  }
  render() {
    return (
      //Put Chosen days meals here with text fields Tables and buttons
      <div>
        <Container>
          <Row>
            <Col id="mealsForLabel" lg={3} md={4} sm={4} xs={3}>
              <Label >Meals for:</Label>
              <DatePicker

                value={this.state.date}
                onChange={this.changeDate}
                defaultDate={this.getDate()}
                mode="landscape"
              />
            </Col>
            <Col lg={3} md={3} sm={3} xs={3}>
              <br/>
              <RaisedButton> Add New Meal </RaisedButton>
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={5} sm={5} xs={5}>
              <MealList meals={this.state.meals}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
