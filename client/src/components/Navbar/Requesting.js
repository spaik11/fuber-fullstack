import React, { useState } from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from "@material-ui/core";


const margin={
   margin: '10px 0'
}

export const Requesting = () => {

   const [subject, setSubject] = useState('')
   const [description, setDescription] = useState('')
   const [incentive, setIncentive] = useState('')

   const handleChange = (event)=>{
      switch (event.target.name) {
         case 'subject':
            return setSubject(event.target.value)
         case 'description':
            return setDescription(event.target.value)
         case 'incentive':
            return setIncentive(event.target.value)
         default:
            break;
      }
   }

   const handleSubmit = () =>{
      console.log(subject)
      console.log(description)
      console.log(incentive)
   }

   return (
      <div> 
         <h3 style={{textAlign: 'center'}}>Please compose your request:</h3>
         <div style={{display:'flex', flexDirection: 'column', margin:'5px'}}>
            <TextField 
               label="Subject" 
               variant="outlined" 
               style={margin}
               onChange={handleChange}
               value={subject}
               name='subject'
               />
            <TextField
               label="Description of your request"
               multiline
               rows={6}
               variant="outlined"
               style={margin}
               onChange={handleChange}
               value={description}
               name='description'
            />
            <TextField 
               label="Incentive is optional" 
               variant="outlined" 
               style={margin}
               onChange={handleChange} 
               value={incentive}  
               name='incentive'
            />
            <Button 
               type="submit"
               variant="contained"
               color="primary"
               style={margin}
               onClick={()=>handleSubmit()}
            >Submit</Button>
         </div>
      </div>
   )
}

const mapStateToProps = (state) => ({
   
})

const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, mapDispatchToProps)(Requesting)
