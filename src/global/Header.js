import React, { Component } from 'react';
import logo from './logo.svg';
//HTTP Request library
//Material Design
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';


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

  	let header;
  	if (this.props.isConnected) {
  		return (
  			<Appbar className="headerApp">
	        	<img src={logo} />
	        	<Button color="danger" onClick={this.handleLogout}>Logout</Button>
      		</Appbar>
  		)	
  	} else {
  		return (
  			<Appbar className="headerLogin">
	        	<img src={logo}/>
	        	<h1><b>Lead</b>score</h1>
      		</Appbar>
  		)
  	}
  }
}

export default Header;
