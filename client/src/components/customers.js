import React, { Component } from 'react';
import './customers.css';
import axios from 'axios';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
      customers: [],
    };
  }

  componentDidMount() {

  }


  onChangeAddess = (e) => {
    this.setState({
      address: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var addressDetails = {
      params: {
        address: this.state.address,
      }

    };

    axios.get("/api/search", addressDetails)
      .then(res => {
        this.setState({
          customers: res.data !== null ? res.data : [],
          address: ''
        });
      })
      .catch(err => console.log(err));
  }

  displayDetails = (customers) => {
    if(Customers){
      return (
        <ul>{
        customers.map(customer =>
          <li>
            {customer.formattedAddress ? <h4>Formatted Address :- {customer.formattedAddress} </h4> : null}
            {customer.latitude ? <h4>Latitude :- {customer.latitude}</h4> : null}
            {customer.longitude ? <h4>Longitude :- {customer.longitude}</h4> : null}
            {customer.streetNumber ? <h4>Street Number :- {customer.streetNumber} </h4> : null}
            {customer.streetName ? <h4>Street Name :- {customer.streetName} </h4> : null}
            {customer.city ? <h4>City :- {customer.city}</h4> : null}
            {customer.country ? <h4>Country :- {customer.country}</h4> : null}
            {customer.countryCode ? <h4>Country Code :- {customer.countryCode} </h4> : null}
            {customer.zipcode ? <h4>Zip code :- {customer.zipcode}</h4> : null}  
          </li>
        )}
        </ul>
      )
    }
    

  }

  render() {
    var { customers } = this.state || [];
    return (
      <div className="container">
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className="form-group">
            <label>Address: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.address}
              onChange={(e) => this.onChangeAddess(e)}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Get Details" className="btn btn-primary" />
          </div>
        </form>
        {this.displayDetails(customers)}
        
      </div>
    );
  }
}

export default Customers;
