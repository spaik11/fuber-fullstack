import React, { Component } from 'react'
import { GoogleMap, LoadScriptNext, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { connect } from 'react-redux'

import mapStyle from './lib/mapStyle'
import { getUserLocation, getDirections, getActiveMarker } from '../redux/actions/directionsActions'
 
const containerStyle = {
  width: '100%',
  height: '100%'
};

const options = {
   styles: mapStyle,
   disableDefaultUI: true,
   zoomControl: true
}


export class Map extends Component{
   state = {
      scriptReady: false,
      activeMarker: null,
   }


   scriptLoaded = ()=>{
      this.setState({scriptReady: true})
   }

   setActiveMarker = (coords) =>{
      this.setState({activeMarker: coords})
   }

   directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        console.log(response)
        this.props.getDirections(response)
      } else {
        console.log('response: ', response)
      }
    }
  }
   
   componentDidMount(){
      console.log(this.state.activeMarker)
      navigator.geolocation.getCurrentPosition((success, error)=>{
         if(error){
            console.log(error)
         }
         this.props.getUserLocation({lat: success.coords.latitude, lng: success.coords.longitude})
      })
   }

   render(){
      console.log(this.props)
      const { data } = this.props
      const { activeMarker, scriptReady } = this.state
   
      return (
         //GoogleMap renders only after script is loaded otherwise window.google in undefined
         <LoadScriptNext googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} onLoad={this.scriptLoaded}>
            <h1>Fuber</h1>
            {scriptReady && 
            <GoogleMap
               mapContainerStyle={containerStyle}
               center={data.userLoc.lat
                        ? { lat: data.userLoc.lat, lng: data.userLoc.lng }
                        : { lat: data.defaultLoc.lat, lng: data.defaultLoc.lng }
                     }
               zoom={12}
               options={options}
            >
            {data.userLoc && /*!data.friendLoc &&*/ 
               <>
                  <Marker
                     position={{ 
                        lat: data.userLoc.lat, 
                        lng: data.userLoc.lng 
                     }}
                     icon={{
                        url: 'https://svg-clipart.com/clipart/icon/xRbOGuq-person-symbol-white-clipart.png',
                        scaledSize: new window.google.maps.Size(70, 70)
                     }} 
                     animation={window.google.maps.Animation.DROP}
                     onClick={() => {
                        this.setActiveMarker(
                        { 
                           lat: data.userLoc.lat, 
                           lng: data.userLoc.lng 
                        })
                     }}
                  >
                     {activeMarker && 
                     <InfoWindow onCloseClick={() => {
                        this.setActiveMarker(null)
                     }
                     }>
                        <h4>You</h4>
                     </InfoWindow>}
                  </Marker>
                  <Marker
                     name={'self'}
                     position={{ 
                        lat: data.userLoc.lat+0.04, 
                        lng: data.userLoc.lng+0.04
                     }}
                     icon={{
                        url: 'https://svg-clipart.com/clipart/icon/xRbOGuq-person-symbol-white-clipart.png',
                        scaledSize: new window.google.maps.Size(70, 70)
                     }} 
                     animation={window.google.maps.Animation.DROP}
                     onClick={() => {
                        this.setActiveMarker(
                        { 
                           lat: data.userLoc.lat+0.04, 
                           lng: data.userLoc.lng+0.04 
                        })
                     }}
                  >
                     {activeMarker && 
                     <InfoWindow onCloseClick={() => {
                        this.setActiveMarker(null)
                     }
                     }>
                     <>
                        <h4>Friend</h4>
                        <button onClick={() => this.props.getActiveMarker(this.state.activeMarker)}>Accepts request</button>
                     </>
                     </InfoWindow>}
                  </Marker>
               </>
            }
            <DirectionsService
                  options={{
                     destination: {lat: data.friendLoc.lat, lng: data.friendLoc.lng},
                     origin: {lat: data.userLoc.lat, lng: data.userLoc.lng},
                     travelMode: "DRIVING", // mode can be changed here
                  }}
                  callback={this.directionsCallback}
               />
               {this.props.data.directions.geocoded_waypoints !== null && 
                  <DirectionsRenderer
                     options={{
                        directions: this.props.data.directions
                     }}
                  />
               }
            </GoogleMap>
            }
         </LoadScriptNext>
      )
   }
}

const mapStateToProps = (state) => ({
   data: state.directions
})

export default React.memo(connect(mapStateToProps, { getUserLocation, getDirections, getActiveMarker })(Map))