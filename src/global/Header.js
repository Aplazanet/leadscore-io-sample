import React, { Component } from 'react';
import logo from './logo.svg';
//HTTP Request library
//Material Design
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';


class Header extends Component {

  render() {
    return (
      <Appbar className="headerApp">
        <img src={logo}/>
        <h1><b>Lead</b>score</h1>
      </Appbar>
    );
  }
}

export default Header;
