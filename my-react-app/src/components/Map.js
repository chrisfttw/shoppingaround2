// Map.js
import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    const mapStyles = {
      width: '100%',
      height: '400px',
    };

    return (
      <div>
        <Map
          google={this.props.google}
          style={mapStyles}
          initialCenter={{
            lat: 37.7749, // Replace with your desired initial latitude
            lng: -122.4194, // Replace with your desired initial longitude
          }}
          zoom={14} // Adjust the zoom level as needed
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCW7EhKHiCxb8kfaK4xNWxNlIiXZZimazg', // Replace with your actual API key
})(MapContainer);
