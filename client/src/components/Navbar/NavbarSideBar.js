import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestHelp } from '../redux/actions/authUserActions'

import Requesting from './Requesting'
import Helping from './Helping'

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
      const { sidebar, requestHelpBool } =  this.props
      return (
         <div style={{visibility: sidebar ? 'initial' : 'hidden'}}>
            <div style={sideBar}>
               {requestHelpBool 
                  ?<Requesting />
                  :<Helping />
               }
            </div>
        </div>
      )
    }
}
const mapStateToProps = (state) => ({
   sidebar: state.sidebar.visibility,
   requestHelpBool: state.authUser.requestHelp
})


export default connect(mapStateToProps, { requestHelp })(NavbarSideBar)
