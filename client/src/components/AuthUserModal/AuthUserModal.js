import React from "react";
import { connect } from "react-redux";
import { loginUser, createUser } from "../redux/actions/authUserActions";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Login from "./Login";
import Register from "./Register";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: ".75",
    fontFamily: "Roboto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    borderLeft: "1px solid black",
    height: "200px",
    justifyContent: "center",
  },
}));

function AuthUserModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        USER REGISTER/LOGIN
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
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
              <Login />
              <div className={classes.line}></div>
              <Register />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
  };
};

export default connect(mapStateToProps, { loginUser, createUser })(
  AuthUserModal
);
