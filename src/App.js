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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    axios.defaults.headers.common['authToken']
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)


class App extends Component {

  constructor(props){
    super(props);
    this.tryLogin = this.tryLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      redirect: false,
      isFormSubmitted: false,
      alertMsg: '',
      errorMsg: '',
      isConnected: ''
    };
  }

  logout(){
    this.setState({
      redirect: false,
      isFormSubmitted: false,
      alertMsg: '',
      errorMsg: '',
      isConnected: false,
    });
    axios.defaults.headers.common['authToken']='';
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
          redirect: true,
          isConnected: true
        });
    }).catch(function(error){
        that.setState({
          isFormSubmitted: false,
          alertMsg: error.message,
          errorMsg: 'Incorrect combinaison'
        })
    });
  }

  render() {

    return (
      <div className="App">
        <Header isConnected={this.state.isConnected} logout={this.logout}></Header>
        <BrowserRouter>
          <div>
            <Route path='/login' render={()=><LoginForm login={this.tryLogin} isFormSubmitted={this.state.isFormSubmitted} alertMsg={this.state.alertMsg} errorMsg={this.state.errorMsg} redirect={this.state.redirect} />}></Route>
            <PrivateRoute path='/contacts' component={ContactsList} />
            <PrivateRoute path='/protected' component={App} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;