import React, { Component } from "react";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Switch, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import NavbarSideBar from "./NavbarSideBar";
import logo from "../../assets/fuberLogo.png";
import { sidebarSwitch } from "../redux/actions/sidebarActions";
import {
  setUserAuth,
  isAuthenticated,
  logout,
} from "../redux/actions/authUserActions";
import { requestHelp } from "../redux/actions/authUserActions";

const navContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "black",
  color: "#eee",
  height: "3rem",
  padding: "0 20px",
};

const logoContainer = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  height: "100%",
  maxWidth: "100%",
  padding: "0 10px",
};

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
      <div style={navContainer}>
        <NavbarSideBar />
        <div style={logoContainer}>
          <img style={logoStyle} src={logo} alt="fuber logo" />
          <div style={{ fontSize: "1.6rem" }}>Fuber</div>
        </div>
        {authUser.requestHelp !== null && (
          <div style={{ display: "flex", alignItems: "center", width: "120%" }}>
            <p style={{ color: "#eee" }}>Helping</p>
            <BlueSwitch
              checked={!!authUser.requestHelp}
              onChange={() => this.props.requestHelp(!authUser.requestHelp)}
              disabled={requestAccepted}
            />
            <p style={{ color: "#eee" }}>Being Helped</p>
          </div>
        )}
        {authUser.user.username !== null ? (
          <Button
            style={{ color: "#eee" }}
            onClick={() => {
              this.props.logout();
              window.location.reload();
            }}>
            LogOut
          </Button>
        ) : null}
        <IconButton
          style={{ color: "#eee" }}
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
});

export default React.memo(
  connect(mapStateToProps, { sidebarSwitch, setUserAuth, requestHelp, logout })(
    Navbar
  )
);
