import React, { Component } from 'react';
//HTTP Request library
import './ContactRow.css';

import defaultPicture from './contactDefaultPicture.png';

class ContactRow extends Component {

  constructor(props){
    super(props);

    this.state={
      contact: this.props.contact
    }
  }

  render() {
    let picture;
    if (!this.state.contact.profilePicture) {
      picture=<img className="profilePicture" src={defaultPicture} alt="profile" />;
    } else {
      picture=<img className="profilePicture" src={this.state.contact.profilePicture} alt="profile" />;
    }

    return (
      <tr>
        <td>{picture}</td>
        <td>{this.state.contact.displayName}</td>
        <td>{this.state.contact.contactType}</td>
        <td>{this.state.contact.phoneNumbers[0].number}</td>
        <td>{this.state.contact.emails[0].email}</td>
      </tr>
    );
  }
}

export default ContactRow;