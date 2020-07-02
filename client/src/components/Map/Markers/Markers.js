import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { acceptRequest } from "../../redux/actions/directionsActions";

import personMarker from '../../../assets/personMarker.png'
import sosMarker from '../../../assets/sosMarker.png'

import mockData from '../markerData'


export class Markers extends Component {
   render() {
      const { data } = this.props
      return (
         <>
            {mockData.map((person, i) => {
                  if(person.role === 'self'){
                     return (
                        <Marker
                           key={person.id}
                           position={{ 
                              lat: data.userLoc.lat, 
                              lng: data.userLoc.lng 
                           }}
                           icon={{
                              url: personMarker,
                              scaledSize: new window.google.maps.Size(70, 70)
                           }}
                           animation={window.google.maps.Animation.DROP}
                        >
                           <InfoWindow onCloseClick={() => {
                              // function to close marker's info window
                           }}>
                              <h4>You</h4>
                           </InfoWindow>
                        </Marker>
                     )
                  }else{
                     if(!this.props.requestHelp){
                        return(
                           <Marker
                              key={person.id}
                              position={{ 
                                 lat: data.userLoc.lat+person.coords.lat, 
                                 lng: data.userLoc.lng+person.coords.lng
                              }}
                              icon={{
                                 url: sosMarker,
                                 scaledSize: new window.google.maps.Size(40, 40)
                              }} 
                              animation={window.google.maps.Animation.DROP}
                              onClick={() => {
                                 //function on marker click
                              }}
                           >
                              <InfoWindow onCloseClick={() => {
                                 // function to close marker's info window
                              }
                              }>
                              <> 
                                 <h4>{person.name}</h4>
                                 <button onClick={() => this.props.acceptRequest({ 
                                    lat: data.userLoc.lat+person.coords.lat, 
                                    lng: data.userLoc.lng+person.coords.lng
                                 })}>Accept request</button>
                              </>
                              </InfoWindow>
                           </Marker>
                        )
                     }
                  }
            })}
         </>
      )
   }
}

const mapStateToProps = (state) => ({
  data: state.directions,
  requestHelp: state.authUser.requestHelp
});

export default connect(mapStateToProps, { acceptRequest })(Markers)
