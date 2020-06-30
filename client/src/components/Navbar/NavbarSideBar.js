import React, { Component } from 'react'
import parse from 'html-react-parser'
import { connect } from 'react-redux'

const sideBar = {
   position: 'absolute',
   top: '3rem',
   right: 0,
   zIndex: 1500,
   color: '#0f0f0f',
   background: 'rgba(238, 238, 238, 0.8)',
   minWidth: '20rem',
   width: '20%',
   minHeight: '50%',
   borderRadius: '0 0 0 15px',
   // overflow: 'scroll'
}

export class NavbarSideBar extends Component {
   render() {
      // console.log(this.props)
      const { sidebar, estimate, friendLoc } =  this.props
      return (
         <div style={{visibility: sidebar ? 'initial' : 'hidden'}}>
            <div style={sideBar}>
               {friendLoc && (
                  <div>
                     <p style={{color:'green'}}>{estimate.start_address} </p>
                     <p style={{color:'red'}}>{estimate.end_address}</p>
                     <p>Distance: {estimate.distance.text} | Duration: {estimate.duration.text}</p>
                     <hr/>
                     <p>Here are the directions</p>
                     {estimate.steps.map((step, i)=>{
                        return(
                           <div key={i}>
                              {i+1+') '}
                              {parse(step.instructions)}
                           </div>
                        )
                     })}
                     <button>Cancel</button>
                  </div>
               )}
               {!friendLoc && 
               <div>
                  <p>List of people you can help</p>
                  <hr/>
                  <ul>
                     <li>Person 1</li>
                     <li>Person 2</li>
                     <li>Person 3</li>
                     <li>Person 4</li>
                     <li>Person 5</li>
                  </ul>
               </div>}
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => ({
   sidebar: state.sidebar.visibility,
   estimate: state.directions.estimate,
   // change line below to request accepted
   friendLoc: !!state.directions.friendLoc.lat
})


export default connect(mapStateToProps, {})(NavbarSideBar)
