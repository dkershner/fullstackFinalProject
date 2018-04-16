import React, { Component } from 'react';
import logo from './logo.svg';
import { SelectField, MenuItem, RaisedButton, FlatButton, AppBar } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import {Label, Container, Row, Col} from 'reactstrap';
import './App.css';
import MealList from './MealList.jsx';



class Dashboard extends Component {
  constructor(props){
      super(props)
      this.state={
        date:this.getDate(),
        meals:{}
      }
      this.getDate=this.getDate.bind(this)
      this.changeDate=this.changeDate.bind(this)

      }
    getDate() {
      var today = new Date()
      today.setFullYear(today.getFullYear())
      return today

    }
    changeDate(e, newDate) {
      this.setState({date:newDate})

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
