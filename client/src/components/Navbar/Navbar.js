import React, { Component } from "react";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

import NavbarSideBar from "./NavbarSideBar";
import logo from "../../assets/fuberLogo.png";
import { sidebarSwitch } from "../redux/actions/sidebarActions";
import { setUserAuth, isAuthenticated } from "../redux/actions/authUserActions";

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

export class Navbar extends Component {
  componentDidMount() {
    const { setUserAuth } = this.props;

    let success = isAuthenticated();

    if (success) {
      setUserAuth(success);
    }
  }

  render() {
    return (
      <div style={navContainer}>
        <NavbarSideBar />
        <div style={logoContainer}>
          <img style={logoStyle} src={logo} alt="fuber logo" />
          <div style={{ fontSize: "1.6rem" }}>Fuber</div>
        </div>
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
});

export default React.memo(
  connect(mapStateToProps, { sidebarSwitch, setUserAuth })(Navbar)
);
