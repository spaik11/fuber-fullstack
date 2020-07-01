import React, { Component } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { connect } from "react-redux";
import io from "socket.io-client";

import mapStyle from "./lib/mapStyle";
import {
  getUserLocation,
  getDirections,
  getActiveMarker,
} from "../redux/actions/directionsActions";
import { loadFriends } from "../redux/actions/authUserActions";

import Markers from "./Markers/Markers";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptReady: false,
    };
    this.socket = io.connect("http://localhost:3001");
  }

  scriptLoaded = () => {
    this.setState({ scriptReady: true });
  };

  directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        //   console.log(response);
        this.props.getDirections(response);
      } else {
        console.log("response: ", response);
      }
    }
  };

  componentDidMount() {
    if (!this.props.data.userLoc.lat) {
      navigator.geolocation.getCurrentPosition((success, error) => {
        if (error) {
          console.log(error);
        }
        if (this.props.authUser.user) {
          const {
            coords: { latitude: lat, longitude: lng },
          } = success;
          this.socket.emit("position", {
            lat,
            lng,
            user: { ...this.props.authUser.user },
            requestHelp: { ...this.props.authUser.requestHelp },
          });
        }

        this.props.getUserLocation({
          lat: success.coords.latitude,
          lng: success.coords.longitude,
        });
      });
    }
    // Need to check refresh page if redux holds request and friends
  }

  render() {
    this.socket.on("otherPositions", (positionsData) => {
      let tempFriends = { ...this.props.authUser.friends };
      tempFriends[positionsData.user.id] = { ...positionsData };

      this.props.loadFriends(tempFriends);
    });
    console.log("PROPS", this.props);
    const { data } = this.props;
    const { scriptReady } = this.state;
    return (
      //GoogleMap renders only after script is loaded otherwise window.google in undefined
      <LoadScriptNext
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        onLoad={this.scriptLoaded}>
        {scriptReady && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              !!data.userLoc.lat
                ? { lat: data.userLoc.lat, lng: data.userLoc.lng }
                : { lat: data.defaultLoc.lat, lng: data.defaultLoc.lng }
            }
               zoom={12}
               options={options}
            >
            {data.userLoc.lat && requestHelp !== null &&
               <Markers />
            }
            {data.friendLoc.lat !== null &&
               <DirectionsService
                     options={{
                        destination: {lat: data.friendLoc.lat, lng: data.friendLoc.lng},
                        origin: {lat: data.userLoc.lat, lng: data.userLoc.lng},
                        travelMode: "DRIVING", // mode can be changed here
                     }}
                     callback={this.directionsCallback}
               />
            }
               {data.directions !== null && 
                  <DirectionsRenderer
                     options={{
                        directions: this.props.data.directions
                     }}
                  />
               }
            </GoogleMap>
        )}
      </LoadScriptNext>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.directions,
  authUser: state.authUser,
  requestHelp: state.authUser.requestHelp
});

export default React.memo(
  connect(mapStateToProps, {
    getUserLocation,
    getDirections,
    getActiveMarker,
    loadFriends,
  })(Map)
);
