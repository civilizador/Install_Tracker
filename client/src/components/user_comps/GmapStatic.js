import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const mapStyles = {
  width: '100%',
  height: '25rem',
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
       google={this.props.google}
           zoom={16}
          style={mapStyles}
          center={ { lat:  40.105334, lng: -74.937721} }
          initialCenter={{ lat:  40.105334, lng: -74.937721}}
      >

         <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{ lat:   40.105334, lng: -74.937721}} />

        </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPS
 })(MapContainer)
