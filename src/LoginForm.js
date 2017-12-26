import React, { Component } from 'react';
import './LoginForm.css';
//HTTP Request library
import Loader from './loader.gif';
//Material Design
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import { Redirect } from 'react-router-dom';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange(e){
    const value = e.target.value;
    const name= e.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    this.props.login(this.state.email, this.state.password);
    e.preventDefault();
  }

  render() {

    if (this.props.redirect) {
      return <Redirect to="/contacts" />;
    }

    var button;
    if (!this.props.isFormSubmitted) {
      button=<Button color="primary" variant="raised" onClick={this.handleSubmit}>Login</Button>;
    } else {
      button=<img width='70px' height='70px' src={Loader} alt="loader" />;
    }
    return (
      <Container>
        <Form className="loginForm">
          <legend>Welcome to the Leadscore.io sample in ReactJS. Write your email and password to see your contacts :</legend>
          <span style={{color:'red',fontWeight:'bold'}}>{this.props.alertMsg}</span>
          <Input type="email" label="Email" name="email" value={this.state.email} onChange={this.handleChange} required={true} floatingLabel={true} />
          <Input type="password" label="Password" name="password" value={this.state.password} onChange={this.handleChange} required={true} floatingLabel={true} />
          <p style={{color:'red',fontWeight:'bold'}}>{this.props.errorMsg}</p>
          {button}
        </Form>
      </Container>
    );
  }
}

export default LoginForm;