import React, { Component } from 'react';
import logo from './logo.svg';
import {TextField, TimePicker, Dialog, SelectField, MenuItem, RadioButton,
  RadioButtonGroup, RaisedButton, FlatButton, AppBar } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import {Label, Container, Row, Col} from 'reactstrap';
import './App.css';
import MealList from './MealList.jsx';
import _ from "lodash";
import { GoogleLogin } from 'react-google-login';

//Signin information



// The main page for the user
class Dashboard extends Component {
  constructor(props){
      super(props)
      this.state={
        date:this.getDate(),
        meals:{},
        userID:null,
        open:false,
        newMealTime:null,
        newMealName:null,
        newMealCals:null,
        newMealCarbs:null,
        alertOpen:false,
        mealsToDelete: [],
        loggedIn:false,
        needLogIn:true
      }
      this.getDate=this.getDate.bind(this)
      this.changeDate=this.changeDate.bind(this)
      this.mealsForDate=this.mealsForDate.bind(this)
      this.dateString=this.dateString.bind(this)
      this.timeString=this.timeString.bind(this)
      this.upDateMealTime=this.upDateMealTime.bind(this)
      this.upDateMealName=this.upDateMealName.bind(this)
      this.upDateMealCals=this.upDateMealCals.bind(this)
      this.upDateMealCarbs=this.upDateMealCarbs.bind(this)
      this.handleOpen=this.handleOpen.bind(this)
      this.handleClose=this.handleClose.bind(this)
      this.handleAlertClose=this.handleAlertClose.bind(this)
      this.handleCancel=this.handleCancel.bind(this)
      this.setDeleteMeals=this.setDeleteMeals.bind(this)
      this.deleteMeals=this.deleteMeals.bind(this)
      }
    //Get todays date for the default date in the date picker
    getDate() {
      var today = new Date()
      today.setFullYear(today.getFullYear())
      return today
    }
    // This is used when a new date is selected in the date picker.
    // It calls mealsForDate to fetch all the meals the user has scheduled
    // on that date.
    changeDate(e, newDate) {
      this.setState({date:newDate}, () => this.mealsForDate())
    }

    // Converts the date to a string in the format that we use for the server.
    // This will make it easier to fetch for each date.
    dateString(date){
      return date.getMonth() + '-' + date.getUTCDate() + '-' + date.getYear()
    }
    timeString(time) {
      return time.getHours() + ":" + time.getMinutes()
    }

    // Find all the scheduled meals for a given date.
    mealsForDate() {
      var text = this.dateString(this.state.date) + "/" + this.state.userID;
      console.log("Fetching with date: " + text)
      fetch("http://ec2-18-191-0-236.us-east-2.compute.amazonaws.com:3000/" + text)
        .then(res => {
          return res.json()
        })
        .then(r => {
          return r.meals
        })
         .then(r => {
           return _.sortBy(r, ['time'])
          })
         .then(data => {
           this.setState({meals:data})
          })
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
  // componentDidMount() {
  //   this.mealsForDate()
  // }

  setDeleteMeals = (dataFromChild) => {
    var selectedMeals = dataFromChild.map(index => this.state.meals[index])
    this.setState({mealsToDelete: selectedMeals})
  }

  deleteMeals() {
    if (this.state.mealsToDelete.length !== 0) {
      this.state.mealsToDelete.map(meal => {
        fetch('http://ec2-18-191-0-236.us-east-2.compute.amazonaws.com:3000/test',
        {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(meal)
        })
        .then(r => this.mealsForDate())
      })
    }
  }


  //Clears all values on opening
  handleOpen = () => {
    this.setState({open: true});
    this.setState({newMealTime:null})
    this.setState({newMealCarbs:null})
    this.setState({newMealCals:null})
    this.setState({newMealName:null})
  };


  // When the submit button is hit this function will be used to add the
  // added meal to the database and table. It also checks to make sure the
  // meal is valid.
  handleClose = () => {

    if(this.state.newMealTime==null ||
      this.state.newMealCarbs=="" ||
      this.state.newMealCarbs==null ||
      this.state.newMealCals=="" ||
      this.state.newMealCals==null ||
      this.state.newMealName=="" ||
      this.state.newMealName==null) {
      this.setState({alertOpen:true})
    }
    else {
      this.setState({open: false});
      var newMeal = {
      	name: this.state.newMealName,
      	date: this.dateString(this.state.date),
        time: this.timeString(this.state.newMealTime),
      	calories: this.state.newMealCals,
      	carbs: this.state.newMealCarbs,
        userID: this.state.userID
      }
      fetch('http://ec2-18-191-0-236.us-east-2.compute.amazonaws.com:3000/test',
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newMeal)
      })
      .then(r => this.mealsForDate())
      }
    };

  handleAlertClose = () => {
    this.setState({alertOpen: false});
    //Add meal to database and table

  };
  handleCancel = () => {
    this.setState({open: false});
  }


  render() {
    const responseGoogle = (response) => {
      console.log(response)
      var profile = response.googleId;
      this.setState({userID:profile});
      console.log(this.userID)
      this.setState({needLogIn:false});
      this.setState({loggedIn:true});
      this.mealsForDate();
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    const alert_actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleAlertClose}
      />
    ];
    return (
      //Put Chosen days meals here with text fields Tables and buttons
      <div>
        <Dialog
          title="Sign-in using Google"
          modal={false}
          open={this.state.needLogIn}
          onRequestClose={this.handleAlertClose}
        >

        <GoogleLogin
             clientId="1042868149379-bg9ir7fla3qqpfpl728229jen3l06emg.apps.googleusercontent.com"
             buttonText="Login"
             onSuccess={responseGoogle}
            />
        </Dialog>
        <Container>
          <Row>
            <Col lg={3} md={4} sm={4} xs={3}>
              <Label id="mealsForLabel" >Meals For</Label>
              {/* A field with a pop up calandar to pick a date */}
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
            {/*
            <Col lg={3} md={4} sm={4} xs={3}>
              <br/>
              <RaisedButton id="addMeal" label="From Meals"></RaisedButton>
            </Col>
            */}


            <Col lg={3} md={3} sm={3} xs={3}>
              <br/>
              <RaisedButton id="addMeal2" label="New Meal" onClick={this.handleOpen} />
                {/* A pop up dialog contaier that has textfields and a time picker
                  to give information about the meal they are adding to the date
                 */}
                <Dialog
                  title={"Add Meal for " + this.state.date.toLocaleDateString()}
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleCancel}
                >
                <TextField
                  hintText="Ex: Pizza"
                  floatingLabelText="Meal Name"
                  value={this.state.newMealName}
                  onChange={this.upDateMealName}
                />
                <TextField
                  hintText="Ex: 98"
                  floatingLabelText="Calories"
                  onChange={this.upDateMealCals}
                  value={this.state.newMealCals}
                />
                <TextField
                  hintText="Ex: 10"
                  floatingLabelText="Carbs (g)"
                  value={this.state.newMealCarbs}
                  onChange={this.upDateMealCarbs}
                />
                <TimePicker
                  onChange={this.upDateMealTime}
                  hintText="Time of Meal"
                  value={this.state.newMealTime}
                />
                </Dialog>
                <Dialog
                  actions={alert_actions}
                  modal={false}
                  open={this.state.alertOpen}
                  onRequestClose={this.handleAlertClose}
                >
                Please fill out all of the fields for your meal.
                </Dialog>
            </Col>
            <Col lg={3} md={3} sm={3} xs={3}>
              <br/>
              <RaisedButton id="deleteMeal" label="Delete" onClick={this.deleteMeals} />
            </Col>
          </Row>
          {/* */}
          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <MealList meals={this.state.meals} callbackFromParent={this.setDeleteMeals}/>
            </Col>

          </Row>

        </Container>
      </div>
    );
  }
}

export default Dashboard;
