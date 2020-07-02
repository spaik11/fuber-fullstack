import React, { Component } from "react";
import parse from "html-react-parser";
import { connect } from "react-redux";
import { cancelHelp } from "../redux/actions/directionsActions";
import { requestHelp } from "../redux/actions/authUserActions";

const sideBar = {
  position: "absolute",
  top: "3rem",
  right: 0,
  zIndex: 1500,
  color: "#0f0f0f",
  background: "rgba(238, 238, 238, 0.8)",
  minWidth: "20rem",
  width: "20%",
  minHeight: "50%",
  borderRadius: "0 0 0 15px",
  // overflow: 'scroll'
};

export class NavbarSideBar extends Component {
  render() {
    const { sidebar, estimate, friendLoc, requestHelp } = this.props;
    return (
      <div style={{ visibility: sidebar ? "initial" : "hidden" }}>
        <div style={sideBar}>
          {console.log(!!requestHelp)}
          {friendLoc && (
            <div>
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
              <button onClick={() => this.props.cancelHelp()}>Cancel</button>
            </div>
          )}
          {this.props.authUser.friends && (
            <div>
              <p>List of people you can help</p>
              <hr />
              <ul>
                {this.props.authUser.friends.map((friend) => {
                  return <li>{friend.user.username}</li>;
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.authUser,
  sidebar: state.sidebar.visibility,
  estimate: state.directions.estimate,
  // change line below to request accepted
  friendLoc: !!state.directions.friendLoc.lat,
  requestHelp: state.authUser.requestHelp,
});

export default connect(mapStateToProps, { cancelHelp, requestHelp })(
  NavbarSideBar
);
