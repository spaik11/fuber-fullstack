import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Toastify from "./components/Toastify/Toastify";
import Map from "./components/Map/Map";
import AuthUserModal from "./components/AuthUserModal/AuthUserModal";
import OptionModal from "./components/OptionModal/OptionModal";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import store from "./components/redux/store/store";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:3001");

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Toastify />
        <div
          style={{ height: `100%`, display: "flex", flexDirection: "column" }}>
          <Navbar />
          <Map socket={socket} />
        </div>
        <Switch>
          <PrivateRoute exact path="/option" component={OptionModal} />
          <Route path="/" exact component={AuthUserModal} />
        </Switch>
      </Router>
    </Provider>
  );
}
