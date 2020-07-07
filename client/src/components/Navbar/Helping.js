import React, { useEffect } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";

import { cancelHelp } from "../redux/actions/directionsActions";
import { setActiveMarker } from "../redux/actions/activeMarkerActions";

const styledLi = {
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  marginRight: "20px",
};

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

export const Helping = (props) => {
  const {
    requestAccepted,
    estimate,
    friendList,
    userEmail,
    friendEmail,
    userLocation,
    socket
  } = props;

  useEffect(() => {
    if (socket && estimate.duration.text) {
      socket.emit("get-duration", {
        duration: estimate.duration.text,
        email: friendEmail,
      });
    }
  }, [estimate]);

  return (
    <div>
      {requestAccepted && (
        <div style={{height: '600px', overflow: 'auto'}}>
          <p style={{ color: "green" }}>{estimate.start_address} </p>
          <p style={{ color: "red" }}>{estimate.end_address}</p>
          <p>
            Distance: {estimate.distance.text} | Duration:{" "}
            {estimate.duration.text}
          </p>
          <hr />
          <p>Here are the directions</p>
          {estimate.steps.map((step, i) => {
            return (
              <div key={i}>
                {i + 1 + ") "}
                {parse(step.instructions)}
              </div>
            );
          })}
          <button onClick={() => {
             props.cancelHelp()
             props.socket.emit('cancel-help', {email: friendEmail})
             props.setActiveMarker(null)
         }} 
         >Cancel</button>
        </div>
      )}
      {!requestAccepted && (
        <>
          {friendList.length < 1 ? (
            <h3 style={{ textAlign: "center" }}>
              Good news! No active requests
            </h3>
          ) : (
            <>
              <h3 style={{ textAlign: "center" }}>They need your help:</h3>
              <ul style={{ listStyleType: "none" }}>
                {friendList.map((friend) => {
                  if (friend.email !== userEmail 
                     && friend.requestHelpSent 
                     &&!friend.requestAccepted
                     && !friend.acceptedBy) {
                    return (
                      <React.Fragment key={friend.id}>
                        <li
                          style={styledLi}
                          onClick={() => props.setActiveMarker(friend)}>
                          <div>{friend.username}</div>
                          <div>
                            {distance(
                              userLocation.lat,
                              userLocation.lng,
                              friend.lat,
                              friend.lng,
                              "M"
                            ).toFixed(1)}{" "}
                            mi.
                          </div>
                        </li>
                      </React.Fragment>
                    );
                  } else {
                    return null;
                  }
                })}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  estimate: state.directions.estimate,
  requestAccepted: state.directions.requestAccepted,
  friendList: state.authUser.friends,
  userEmail: state.authUser.user.email,
  userLocation: state.directions.userLoc,
  socket: state.authUser.socket,
  friendEmail: state.directions.friendLoc.email,
});

export default connect(mapStateToProps, { cancelHelp, setActiveMarker })(
  Helping
);
