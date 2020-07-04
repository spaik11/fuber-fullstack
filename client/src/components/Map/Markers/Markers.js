import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { acceptRequest } from "../../redux/actions/directionsActions";

import personMarker from '../../../assets/personMarker.png'
import sosMarker from '../../../assets/sosMarker.png'

export class Markers extends Component {
   render() {
      const { data, friendList } = this.props
      return (
         <>
            <Marker
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
            {friendList && friendList.map(friend=>{
               if(friend.requestHelp){
                  return(
                     <Marker
                        key={friend.id}
                        position={{ 
                           lat: friend.lat, 
                           lng: friend.lng
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
                           <h4>{friend.username}</h4>
                           <button onClick={() => this.props.acceptRequest({ 
                              lat: friend.lat, 
                              lng: friend.lng
                           })}>Accept request</button>
                        </>
                        </InfoWindow>
                     </Marker>
                  )
               }else{
                  return null
               }
            })}
         </>
      )
   }
}

const mapStateToProps = (state) => ({
  data: state.directions,
  requestHelp: state.authUser.requestHelp,
  friendList: state.authUser.friends
});

export default connect(mapStateToProps, { acceptRequest })(Markers)
