import React from 'react'
import { connect } from 'react-redux'
import parse from 'html-react-parser'

import { cancelHelp } from '../redux/actions/directionsActions'

export const Helping = (props) => {
   const { requestAccepted, estimate } = props
   return (
      <div>
         {requestAccepted && (
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
               <button onClick={()=> props.cancelHelp()}>Cancel</button>
            </div>
         )}
         {!requestAccepted &&
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
            </div>
         }
      </div>
   )
}

const mapStateToProps = (state) => ({
   estimate: state.directions.estimate,
   requestAccepted: state.directions.requestAccepted,
})

const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, { cancelHelp })(Helping)
