import React from "react";
import { Provider } from "react-redux";
import Toastify from "./components/Toastify/Toastify";

import Map from "./components/Map/Map";
import AuthUserModal from "./components/AuthUserModal/AuthUserModal";
import Navbar from './components/Navbar/Navbar'
import store from './components/redux/store/store'
import './App.css'

export default function App() {
  return (
    <Provider store={store}>
      <Toastify />
       <div style={{height: `100%`, display: 'flex', flexDirection: 'column'}}>
        <Navbar />
        <Map />
      </div>
      <AuthUserModal />
    </Provider>
  );
}
