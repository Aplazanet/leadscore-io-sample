import React, { Component } from 'react';
import './App.css';
//HTTP Request library
import axios from 'axios';
//Material Design
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

import LoginForm from './LoginForm.js';
import ContactsList from './ContactsList.js';

import Header from './global/Header.js';

import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)


class App extends Component {

  constructor(props){
    super(props);
    this.tryLogin = this.tryLogin.bind(this);
    this.state = {
      redirect: false,
      isFormSubmitted: false,
      alertMsg: ''
    };
  }

  tryLogin(username, password){
    this.setState({
      isFormSubmitted: true
    });
    let that=this;    
    axios.post('https://internal-api-staging-lb.interact.io/v2/login', {
      "username":username,
      "password":password
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(function(response){
        //put the token in the header
        axios.defaults.headers.common['authToken'] = response.data.token.authToken;
        that.setState({
          redirect: true
        });
    }).catch(function(error){
        that.setState({
          isFormSubmitted: false,
          alertMsg: error.message
        })
    });
  }

  render() {

    return (
      <div className="App">
        <Header></Header>
        <BrowserRouter>
          <div>
            <Route path='/login' render={()=><LoginForm login={this.tryLogin} isFormSubmitted={this.state.isFormSubmitted} alertMsg={this.state.alertMsg} redirect={this.state.redirect}/>}></Route>
            <Route path='/contacts' component={ContactsList} />
            <PrivateRoute path='/protected' component={App} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;