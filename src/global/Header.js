import React, { Component } from 'react';
import logo from './logo.svg';
//HTTP Request library
//Material Design
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';


class Header extends Component {

  constructor(props)
  {
  	super(props);
  	this.handleLogout=this.handleLogout.bind(this);
  }

  handleLogout(){
  	this.props.logout();
  }

  render() {
  	if (this.props.isConnected) {
  		return (
  			<Appbar className="headerApp">
	        	<img src={logo} alt="logo"/>
	        	<Button color="danger" onClick={this.handleLogout}>Logout</Button>
      		</Appbar>
  		)	
  	} else {
  		return (
  			<Appbar className="headerLogin">
	        	<img src={logo} alt="logo"/>
	        	<h1><b>Lead</b>score</h1>
      		</Appbar>
  		)
  	}
  }
}

export default Header;