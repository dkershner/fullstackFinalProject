import React, { Component } from 'react';
import logo from './logo.svg';
import {TextField, TimePicker, Dialog, SelectField, MenuItem, RadioButton,
  RadioButtonGroup, RaisedButton, FlatButton, AppBar } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import {Label, Container, Row, Col} from 'reactstrap';
import './App.css';
import MealList from './MealList.jsx';
import _ from "lodash";

// The main page for the user
class Dashboard extends Component {
  constructor(props){
      super(props)
      this.state={
        date:this.getDate(),
        meals:{},
        open:false,
        newMealTime:null,
        newMealName:null,
        newMealCals:null,
        newMealCarbs:null

      }
      this.getDate=this.getDate.bind(this)
      this.changeDate=this.changeDate.bind(this)
      this.mealsForDate=this.mealsForDate.bind(this)
      this.dateString=this.dateString.bind(this)
      this.upDateMealTime=this.upDateMealTime.bind(this)
      this.upDateMealName=this.upDateMealName.bind(this)
      this.upDateMealCals=this.upDateMealCals.bind(this)
      this.upDateMealCarbs=this.upDateMealCarbs.bind(this)
      }
    //Get todays date for the default date in the date picker
    getDate() {
      var today = new Date()
      today.setFullYear(today.getFullYear())
      return today
      this.mealsForDate()
    }
    // This is used when a new date is selected in the date picker.
    // It calls mealsForDate to fetch all the meals the user has scheduled
    // on that date.
    changeDate(e, newDate) {
      this.setState({date:newDate})
      this.mealsForDate()
    }

    // Converts the date to a string in the format that we use for the server.
    // This will make it easier to fetch for each date.
    dateString(date){
      //Change date to the string server uses
    }

    // Find all the scheduled meals for a given date.
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
  upDateMealTime(e, time) {
    this.setState({newMealTime:time})
  }
  upDateMealCarbs(e, carbs) {
    this.setState({newMealCarbs:carbs})
  }
  upDateMealCals(e, cals) {
    this.setState({newMealCals:cals})
  }
  upDateMealName(e, name) {
    this.setState({newMealName:name})
  }

  //Clears all values on opening
  handleOpen = () => {
    this.setState({open: true});
    this.setState({newMealTime:null})
    this.setState({newMealCarbs:null})
    this.setState({newMealCals:null})
    this.setState({newMealName:null})
  };

  //TODO
  // When the submit button is hit this function will be used to add the
  // added meal to the database and table. It also checks to make sure the
  // meal is valid.
  handleClose = () => {
    this.setState({open: false});
    //Add meal to database and table
  };


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      //Put Chosen days meals here with text fields Tables and buttons
      <div>
        <Container>
          <Row>
            <Col lg={3} md={4} sm={4} xs={3}>
              <Label id="mealsForLabel" >Meals For</Label>
              <DatePicker
                value={this.state.date}
                onChange={this.changeDate}
                defaultDate={this.getDate()}
                formatDate={new Intl.DateTimeFormat('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format}
                mode="landscape"
              />
            </Col>
            <Col lg={3} md={4} sm={4} xs={3}>
              <br/>
              <RaisedButton id="addMeal" label="From Meals"></RaisedButton>
            </Col>

            {/* */}
            <Col lg={3} md={3} sm={3} xs={3}>
              <br/>
              <RaisedButton id="addMeal2" label="New Meal" onClick={this.handleOpen} />
                <Dialog
                  title={"Add Meal for " + this.state.date.toLocaleDateString()}
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                <TextField
                  hintText="Meal Name"
                  floatingLabelText="Meal Name"
                  value={this.state.newMealName}
                  onChange={this.upDateMealName}
                />
                <TextField
                  hintText="Calories"
                  floatingLabelText="Calories"
                  onChange={this.upDateMealCals}
                  value={this.state.newMealCals}
                />
                <TextField
                  hintText="Carbs"
                  floatingLabelText="Carbs"
                  value={this.state.newMealCarbs}
                  onChange={this.upDateMealCarbs}
                />
                <TimePicker
                  onChange={this.upDateMealTime}
                  hintText="Time of Meal"
                  value={this.state.newMealTime}
                />
                </Dialog>
            </Col>
          </Row>
          {/* */}
          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <MealList meals={this.state.meals}/>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
