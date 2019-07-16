import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";

const mapStyles = {
  width: '100%',
  height: '20rem',
};

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GMAPS);


export class MapContainer extends Component {
  state={lat:'',lng:''}
  getLatLng=()=>{
    Geocode.fromAddress("Eiffel Tower").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        this.setState({lat,lng})
      },
      error => {
        console.error(error);
      }
    );
  }
  render() {
    this.getLatLng()
    return (
      <Map
       google={this.props.google}
           zoom={8}
          style={mapStyles}
          center={ { lat:  42.3601, lng: -71.0589 } }
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />

    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPS
 })(MapContainer)
