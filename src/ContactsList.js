import React, { Component } from 'react';
//HTTP Request library
//Material Design
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

import Loader from './loader.gif';

import axios from 'axios';

import ContactRow from './ContactRow.js';


class ContactsList extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      contacts:[],
    }
  }

  componentDidMount(){
    let that=this;
    axios.get('https://internal-api-staging-lb.interact.io/v2/contacts', 
      { 
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function(response){
          that.setState({
            contacts: response.data.data
          });
      });
  }

  render() {

    var rows = [];
    this.state.contacts.forEach((contact) => {
      rows.push(<ContactRow key={contact.id} contact={contact}></ContactRow>);
      console.log(contact.emails[0].email);
    })

    return (
      <Container fluid={true}>
        <table className="mui-table mui-table--bordered">
           <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Type</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
           </thead>
           <tbody>
               {rows}
           </tbody>
         </table>
      </Container>
    );
  }
}

export default ContactsList;
