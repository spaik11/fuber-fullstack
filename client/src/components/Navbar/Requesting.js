import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { requestHelpSent } from "../redux/actions/authUserActions";

const margin = {
  margin: "10px 0",
};

export const Requesting = (props) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [incentive, setIncentive] = useState("");

  const handleChange = (event) => {
    switch (event.target.name) {
      case "subject":
        return setSubject(event.target.value);
      case "description":
        return setDescription(event.target.value);
      case "incentive":
        return setIncentive(event.target.value);
      default:
        break;
    }
  };

  const handleSubmit = () => {
    props.requestHelpSent(true);
    props.socket.emit("set-request", {
      subject,
      description,
      incentive,
      email: props.userEmail,
    });
  };

  const handleCancel = () => {
    props.requestHelpSent(false);
    props.socket.emit("remove-request", {
      email: props.userEmail,
    });
  };
  const user = props.friends.find((user) => user.email === props.userEmail);
  return (
    <div>
      {user && user.requestAccepted ? (
        <h3 style={{ textAlign: "center" }}>Help is on the way</h3>
      ) : props.requestHelpStatus ? (
        <h3 style={{ textAlign: "center" }}>Request sent...</h3>
      ) : (
        <h3 style={{ textAlign: "center" }}>Please compose your request:</h3>
      )}
      {user && user.requestAccepted ? (
        <div
          style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
          <p>{subject}</p>
          <p>{description}</p>
          <p>{incentive}</p>
          <p>Accepted by: {user.acceptedBy}</p>
          <p>ETA: {user.duration}</p>
          <button onClick={()=>{
            handleCancel()
            props.socket.emit('cancel-help',{email: props.userEmail})
          }}>Cancel request</button>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
          <TextField
            label="Subject"
            variant="outlined"
            style={margin}
            onChange={handleChange}
            value={subject}
            name="subject"
            disabled={props.requestHelpStatus}
          />
          <TextField
            label="Description of your request"
            multiline
            rows={6}
            variant="outlined"
            style={margin}
            onChange={handleChange}
            value={description}
            name="description"
            disabled={props.requestHelpStatus}
          />
          <TextField
            label="Incentive is optional"
            variant="outlined"
            style={margin}
            onChange={handleChange}
            value={incentive}
            name="incentive"
            disabled={props.requestHelpStatus}
          />
          {props.requestHelpStatus ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={margin}
              onClick={() => handleCancel()}>
              Cancel
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={margin}
              onClick={() => handleSubmit()}
              disabled={!props.coords.lat}>
              Submit
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userEmail: state.authUser.user.email,
  socket: state.authUser.socket,
  requestHelpStatus: state.authUser.requestHelpSent,
  friends: state.authUser.friends,
  coords: state.directions.userLoc,
});

export default connect(mapStateToProps, { requestHelpSent })(Requesting);
