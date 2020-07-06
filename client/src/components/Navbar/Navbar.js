import React, { Component } from "react";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Switch, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import NavbarSideBar from "./NavbarSideBar";
import logo from "../../assets/FUBER.png";
import { sidebarSwitch } from "../redux/actions/sidebarActions";
import {
  setUserAuth,
  isAuthenticated,
  logout,
} from "../redux/actions/authUserActions";
import { requestHelpSwitch } from "../redux/actions/authUserActions";
import { toggleDarkMode } from "../redux/actions/darkModeActions";
import {
  darkNavContainer,
  lightNavContainer,
  darkNav,
  lightNav,
  logoContainer,
  logoStyle,
} from "./NavbarStyle";

const BlueSwitch = withStyles({
  switchBase: {
    color: blue[300],
    "&$checked": {
      color: blue[500],
    },
    "&$checked + $track": {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: { backgroundColor: blue[500] },
})(Switch);

const BlackSwitch = withStyles({
  switchBase: {
    color: blue[300],
    "&$checked": {
      color: blue[500],
    },
    "&$checked + $track": {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: { backgroundColor: blue[500] },
})(Switch);

export class Navbar extends Component {
  componentDidMount() {
    const { setUserAuth } = this.props;

    let success = isAuthenticated();

    if (success) {
      setUserAuth(success);
    }
  }

  render() {
    const { authUser, requestAccepted } = this.props;
    return (
      <div
        style={
          this.props.isDarkMode.isDarkMode
            ? darkNavContainer
            : lightNavContainer
        }>
        <NavbarSideBar />
        <div style={logoContainer}>
          <img style={logoStyle} src={logo} alt="fuber logo" />
          <div style={{ fontSize: "1.6rem" }}>Fuber</div>
        </div>
        {authUser.requestHelpSwitch !== null && (
          <div style={{ display: "flex", alignItems: "center", width: "120%" }}>
            <p style={this.props.isDarkMode.isDarkMode ? darkNav : lightNav}>
              Helping
            </p>
            <BlueSwitch
              checked={!!authUser.requestHelpSwitch}
              onChange={() =>
                this.props.requestHelpSwitch(!authUser.requestHelpSwitch)
              }
              disabled={authUser.requestHelpSent}
            />
            <p style={this.props.isDarkMode.isDarkMode ? darkNav : lightNav}>
              Being Helped
            </p>
          </div>
        )}
        {authUser.user.username !== null ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "10%",
              }}>
              <BlackSwitch
                checked={this.props.isDarkMode.isDarkMode}
                onChange={() => this.props.toggleDarkMode()}
              />
              {/* <p style={this.props.isDarkMode.isDarkMode ? darkNav : lightNav}>
                Dark Mode
              </p> */}
            </div>
            <Button
              style={this.props.isDarkMode.isDarkMode ? darkNav : lightNav}
              onClick={() => {
                this.props.logout();
                window.location.reload();
              }}>
              LogOut
            </Button>
          </>
        ) : null}
        <IconButton
          style={this.props.isDarkMode.isDarkMode ? darkNav : lightNav}
          onClick={() => this.props.sidebarSwitch()}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.authUser,
  requestAccepted: state.directions.requestAccepted,
  socket: state.authUser.socket,
  isDarkMode: state.isDarkMode,
});

export default React.memo(
  connect(mapStateToProps, {
    sidebarSwitch,
    setUserAuth,
    requestHelpSwitch,
    logout,
    toggleDarkMode,
  })(Navbar)
);
