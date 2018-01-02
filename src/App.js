import React, { Component } from 'react';
import './App.css';
//HTTP Request library
import axios from 'axios';

import Cookies from 'universal-cookie';

import Header from './global/Header.js';
import Home from './Home.js';
import LoginForm from './LoginForm.js';
import ContactsList from './ContactsList.js';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

const cookies = new Cookies();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookies.get('authToken')
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
      redirect: cookies.get('authToken') ? true : false,
      isFormSubmitted: false,
      alertMsg: '',
      errorMsg: '',
      isConnected: cookies.get('authToken') ? true : false
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
    cookies.remove('authToken');
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
        cookies.set('authToken', response.data.token.authToken);
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
            <Route exact path='/' component={Home} />
            <Route path='/login' render={()=><LoginForm login={this.tryLogin} isFormSubmitted={this.state.isFormSubmitted} alertMsg={this.state.alertMsg} errorMsg={this.state.errorMsg} redirect={this.state.redirect} />}></Route>
            <PrivateRoute path='/contacts' component={ContactsList} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;