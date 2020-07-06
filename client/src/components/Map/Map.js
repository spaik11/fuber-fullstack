import React, { Component } from "react";
import io from "socket.io-client";
import {
  GoogleMap,
  LoadScriptNext,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { connect } from "react-redux";
import {
  getUserLocation,
  getDirections,
} from "../redux/actions/directionsActions";
import { loadFriends, setSocket } from "../redux/actions/authUserActions";
import { toggleDarkMode } from "../redux/actions/darkModeActions";

import { DARK_MODE, LIGHT_MODE } from "./lib/mapStyle";
import Markers from "./Markers/Markers";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptReady: false,
      socket: null,
    };
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

  initializeSocket = async () => {
    const socket = await io();

    socket.on("connect", () => {
      console.log("Connected to socket");
      this.props.setSocket(socket);
      if (this.props.authUser.user.username) {
        socket.emit("initial-connect", {
          ...this.props.authUser.user,
          requestHelpSent: this.props.authUser.requestHelpSent,
          lat: null,
          lng: null,
        });
      }
      this.receiveUserCoordinates(socket);
    });
    socket.on("updated-user-list", (userArray) => {
      console.log(userArray);
      this.props.loadFriends(userArray);
    });
  };

  receiveUserCoordinates = (socket) => {
    navigator.geolocation.getCurrentPosition((success, error) => {
      if (error) {
        console.log(error);
      }
      const {
        coords: { latitude: lat, longitude: lng },
      } = success;
      this.props.getUserLocation({
        lat,
        lng,
      });

      if (this.props.authUser.user.email) {
        socket.emit("user-coordinates", {
          email: this.props.authUser.user.email,
          lat: this.props.data.userLoc.lat,
          lng: this.props.data.userLoc.lng,
        });
      }
    });
  };

  componentDidMount() {
    let darkMode = localStorage.getItem("darkMode");

    if (darkMode === "true") {
      this.props.toggleDarkMode();
    }

    this.initializeSocket();
  }

  render() {
    // console.log("PROPS", this.props);
    const { data, requestHelp } = this.props;
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
            options={{
              styles: this.props.isDarkMode.isDarkMode ? DARK_MODE : LIGHT_MODE,
              disableDefaultUI: true,
              zoomControl: true,
            }}>
            {data.userLoc.lat && requestHelp !== null && <Markers />}
            {data.friendLoc.lat !== null && (
              <DirectionsService
                options={{
                  destination: {
                    lat: data.friendLoc.lat,
                    lng: data.friendLoc.lng,
                  },
                  origin: { lat: data.userLoc.lat, lng: data.userLoc.lng },
                  travelMode: "DRIVING", // mode can be changed here
                }}
                callback={this.directionsCallback}
              />
            )}
            {data.directions !== null && (
              <DirectionsRenderer
                options={{
                  directions: this.props.data.directions,
                }}
              />
            )}
          </GoogleMap>
        )}
      </LoadScriptNext>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.directions,
  authUser: state.authUser,
  requestHelp: state.authUser.requestHelp,
  isDarkMode: state.isDarkMode,
});

export default React.memo(
  connect(mapStateToProps, {
    getUserLocation,
    getDirections,
    loadFriends,
    setSocket,
    toggleDarkMode,
  })(Map)
);
