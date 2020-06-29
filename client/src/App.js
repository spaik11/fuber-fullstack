import React from "react";
import { Provider } from "react-redux";

import Map from "./components/Map/Map";
import AuthUserModal from "./components/AuthUserModal/AuthUserModal";
import store from "./components/redux/store/store";
import "./App.css";

export default function App() {
  return (
    <Provider store={store}>
      <div style={{ height: `100%`, display: "flex" }}>
        <Map />
      </div>
      <AuthUserModal />
    </Provider>
  );
}
