import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Login from "./Login";
import Register from "./Register";
import { isAuthenticated } from "../redux/actions/authUserActions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto",
    // opacity: ".75",
  },
  paper: {
    backgroundColor: 'rgb(238, 238, 238, 0.8)',
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    width: "550px",
  },
  body: {
    display: "flex",
    justifyContent: "space-between",
  },
  line: {
    borderLeft: "1px solid black",
    height: "250px",
    justifyContent: "center",
  },
}));

export default function AuthUserModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    let success = isAuthenticated();

    if (success) {
      props.history.push("/option");
    }
  }, [props.history]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        disableBackdropClick
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Welcome to Fuber!</h2>
            <div className={classes.body}>
              <Login history={props.history} />
              <div className={classes.line}></div>
              <Register history={props.history} />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
