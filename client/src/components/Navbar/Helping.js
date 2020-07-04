import React from 'react'
import { connect } from 'react-redux'
import parse from 'html-react-parser'

import { cancelHelp } from '../redux/actions/directionsActions'

export const Helping = (props) => {
   const { requestAccepted, estimate, friendList } = props
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
            <>
               {friendList.length<1
               ? <h3 style={{textAlign: 'center'}}>Good news! No active requests</h3>
               : <>
                  <h3 style={{textAlign: 'center'}}>They need your help:</h3>
                  <ul>
                     {friendList.map(friend=>{
                        return(
                           <React.Fragment key={friend.id}>
                           <li>{friend.username}</li>
                           </React.Fragment>
                        )
                     })}
                  </ul>
               </>
               }
            </>
         }
      </div>
   )
}

const mapStateToProps = (state) => ({
   estimate: state.directions.estimate,
   requestAccepted: state.directions.requestAccepted,
   friendList: state.authUser.friends
})

const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, { cancelHelp })(Helping)
