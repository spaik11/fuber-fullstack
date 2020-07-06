import React, { Component } from "react";
import { connect } from "react-redux";
import { Marker, InfoWindow } from "@react-google-maps/api";

import { acceptRequest } from "../../redux/actions/directionsActions";
import { setActiveMarker } from "../../redux/actions/activeMarkerActions";

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
            if (friend.requestHelpSent && friend.email !== userEmail) {
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
                    friend.requestBody && (
                      <InfoWindow zIndex={1600}>
                        <>
                          <h4>Hi, I'm {friend.username}</h4>
                          <p>{friend.requestBody.subject}</p>
                          <p>{friend.requestBody.description}</p>
                          <p>{friend.requestBody.incentive}</p>
                          <button
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
                            }}>
                            Accept request
                          </button>
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

export default connect(mapStateToProps, { acceptRequest, setActiveMarker })(
  Markers
);
