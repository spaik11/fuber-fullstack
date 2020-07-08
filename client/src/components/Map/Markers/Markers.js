import React, { Component } from "react";
import { connect } from "react-redux";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { Button } from "@material-ui/core";

import { acceptRequest } from "../../redux/actions/directionsActions";
import { setActiveMarker } from "../../redux/actions/activeMarkerActions";
import { requestHelpSwitch } from "../../redux/actions/authUserActions"

import personMarker from "../../../assets/darkMarker.png";
import sosMarker from "../../../assets/sosMarker.png";
import lightMarker from "../../../assets/marker.png";

export class Markers extends Component {
  render() {
    const {
      data,
      friendList,
      userEmail,
      activeMarker,
      userUsername,
    } = this.props;
    return (
      <>
        <Marker
          position={{
            lat: data.userLoc.lat,
            lng: data.userLoc.lng,
          }}
          icon={{
            url: this.props.isDarkMode.isDarkMode ? personMarker : lightMarker,
            scaledSize: new window.google.maps.Size(70, 70),
          }}
          animation={window.google.maps.Animation.DROP}>
          <InfoWindow zIndex={1500}>
            <h4>You</h4>
          </InfoWindow>
        </Marker>
        {friendList &&
          friendList.map((friend) => {
            if (friend.requestHelpSent 
                && friend.email !== userEmail 
                &&!friend.requestAccepted
                 && !friend.acceptedBy) {
              return (
                <Marker
                  key={friend.id}
                  position={{
                    lat: friend.lat,
                    lng: friend.lng,
                  }}
                  icon={{
                    url: sosMarker,
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                  animation={window.google.maps.Animation.DROP}
                  onClick={() => {
                    this.props.setActiveMarker(friend);
                  }}>
                  {activeMarker &&
                    activeMarker.id === friend.id &&
                    friend.requestBody && 
                    !friend.requestAccepted && !friend.acceptedBy && (
                      <InfoWindow zIndex={1600} onCloseClick={()=> this.props.setActiveMarker(null)}>
                        <>
                          <h4>
                            {friend.username.slice(0, 1).toUpperCase() +
                              friend.username.slice(1)}{" "}
                            Needs Help
                          </h4>
                          <p>
                            <b>Subject: </b> {friend.requestBody.subject}
                          </p>
                          <p>
                            <b>Description: </b>
                            {friend.requestBody.description}
                          </p>
                          <p>
                            <b>Incentive: </b>
                            {friend.requestBody.incentive}
                          </p>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ alignItems: "center" }}
                            onClick={() => {
                              this.props.acceptRequest({
                                lat: friend.lat,
                                lng: friend.lng,
                                email: friend.email,
                              });
                              this.props.socket.emit("accept-request", {
                                email: friend.email,
                                acceptedBy: userUsername,
                              });
                              this.props.setActiveMarker(null)
                              this.props.requestHelpSwitch(false)
                            }}
                            disabled={this.props.requestHelpSent}
                            >
                            Accept
                          </Button>
                        </>
                      </InfoWindow>
                    )}
                </Marker>
              );
            } else {
              return null;
            }
          })}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.authUser.user.email,
  userUsername: state.authUser.user.username,
  data: state.directions,
  requestHelpSent: state.authUser.requestHelpSent,
  friendList: state.authUser.friends,
  activeMarker: state.activeMarker.activeMarker,
  socket: state.authUser.socket,
  estimate: state.directions.estimate.duration.text,
  isDarkMode: state.isDarkMode,
});

export default connect(mapStateToProps, { acceptRequest, setActiveMarker, requestHelpSwitch })(
  Markers
);
