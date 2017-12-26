import React, { Component } from 'react';
import './LoginForm.css';
//HTTP Request library
import Loader from './loader.gif';
//Material Design
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';

import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: "",
      password: "",
      validityForm: true,
    };
  }

  handleChange(e){
    const value = e.target.value;
    const name= e.target.name;

    this.setState({
      [name]: value
    });
  }

  checkForm(){
    const username=this.state.username;
    const password=this.state.password;

  }

  handleSubmit(e) {
    this.checkForm();
    console.log(this.state.username);
    this.props.login(this.state.username, this.state.password);
    e.preventDefault();
  }

  render() {

    if (this.props.redirect) {
      return <Redirect to="/contacts" />;
    }

    if (this.props.isConnected) {
      return <strong>already connected</strong>;
    }

    var button;
    if (!this.props.isFormSubmitted) {
      button=<Button color="primary" variant="raised" onClick={this.handleSubmit}>Login</Button>;
    } else {
      button=<img width='70px' height='70px' src={Loader} />;
    }
    return (
      <Container>
        <Form className="loginForm">
          <legend>Welcome to the Leadscore.io sample in ReactJS. Write your username and password to see your contacts :</legend>
          <span style={{color:'red',fontWeight:'bold'}}>{this.props.alertMsg}</span>
          <Input type="email" label="Username" name="username" value={this.state.username} onChange={this.handleChange} required={true} floatingLabel={true} />
          <Input type="password" label="Password" name="password" value={this.state.password} onChange={this.handleChange} required={true} floatingLabel={true} />
          {button}
        </Form>
      </Container>
    );
  }
}

export default LoginForm;