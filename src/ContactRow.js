import React, { Component } from 'react';
//HTTP Request library
import './ContactRow.css';

import defaultPicture from './contactDefaultPicture.png';

class ContactRow extends Component {

  constructor(props){
    super(props);

    this.state={
      contact: this.props.contact,
    }
  }

  render() {
    let contact = this.state.contact;
    let picture;
    if (!contact.profilePicture) {
      picture=<img className="profilePicture" src={defaultPicture} alt="profile" />;
    } else {
      picture=<img className="profilePicture" src={contact.profilePicture} alt="profile" />;
    }

    // verify if no number of no email
    const phoneNumber = contact.phoneNumbers ? contact.phoneNumbers[0].number : '';
    const email = contact.emails ? contact.emails[0].email : '';

    return (
      <tr>
        <td>{picture}</td>
        <td>{this.state.contact.displayName}</td>
        <td>{this.state.contact.contactType}</td>
        <td>{phoneNumber}</td>
        <td>{email}</td>
      </tr>
    );
  }
}

export default ContactRow;