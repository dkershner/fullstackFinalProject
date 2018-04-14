import React, { Component } from 'react';
import logo from './logo.svg';
import { SelectField, MenuItem, RaisedButton, FlatButton, AppBar } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import {Container, Row, Col} from 'reactstrap';



class Dashboard extends Component {
  constructor(props){
      super(props)
      this.state={
        date:this.getDate()
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
            <Col lg={3} md={6} sm={12}>.col</Col>
            <Col lg={3} md={6} sm={12}>.col</Col>
            <Col lg={3} md={6} sm={12}>.col</Col>
            <Col lg={3} md={6} sm={12}>.col</Col>
        </Row>
          <Row>
            <Col>
              <DatePicker
                value={this.state.date}
                onChange={this.changeDate}
                defaultDate={this.getDate()}
                mode="landscape"
              />
            </Col>
            <Col>
              <RaisedButton> Add New Meal </RaisedButton>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
