import React, { useState } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { Button, Paper, Typography } from "@material-ui/core";

const API_KEY = "AIzaSyBhD6U4_tnUBI44zeaUxQUvjKhebztIyco";
const API_KEY2 = "AIzaSyBF4hrz2x-eGxEMNGDIJeAHu4t0s7QtuiU";

const Maps = (props) => {
  const [showingInfoWindow, setshowingInfoWindow] = useState(false);
  const [activeMarker, setactiveMarker] = useState({});
  const [address, setAddress] = useState("");
  const [longitude, setlongitude] = useState(-0.0964509);
  const [latitude, setlatitude] = useState(51.5049375);

  const onMarkerClick = (props, marker, e) => {
    setactiveMarker(marker);
    setshowingInfoWindow(true);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    } else {
      alert("geolocation not supported");
    }
  };

  const getCoordinates = (position) => {
    setlongitude(position.coords.longitude);
    setlatitude(position.coords.latitude);
    reverseGeoCode();
  };

  const reverseGeoCode = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${API_KEY2}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results[0].formatted_address);
        setAddress(data.results[0].formatted_address);
      })
      .catch((error) => alert(error));
  };

  return (
    <Map
      item
      xs={12}
      google={props.google}
      initialCenter={{ lat: latitude, lng: longitude }}
      zoom={14}
    >
      <Marker
        onClick={onMarkerClick}
        title={"Changing Colors Garage"}
        position={{ lat: latitude, lng: longitude }}
        name={"Changing Colors Garage"}
      />
      <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
        <Paper>
          <Typography component="h4">Address</Typography>
          <Typography component="p">{address}</Typography>
        </Paper>
      </InfoWindow>
      <div className="box">
        <Button
          variant="contained"
          position="bottom"
          onClick={(e) => {
            e.preventDefault();
            getLocation();
          }}
        >
          Find Me
        </Button>
      </div>
    </Map>
  );
};

export default GoogleApiWrapper({
  api: `${API_KEY}`,
})(Maps);
