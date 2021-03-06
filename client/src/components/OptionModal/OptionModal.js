import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { requestHelpSwitch } from "../redux/actions/authUserActions";
import { sidebarOpen } from "../redux/actions/sidebarActions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto",
    // opacity: ".8",
  },
  paper: {
    backgroundColor: "rgb(238,238,238, 0.8)",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    width: "550px",
  },
  body: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  line: {
    borderLeft: "1px solid black",
    height: "250px",
    justifyContent: "center",
  },
  margin: {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

function OptionModal(props) {
  const classes = useStyles();

  useEffect(() => {
    const mode = localStorage.getItem("requestHelpSwitch");
    if (mode !== null) {
      props.requestHelpSwitch(mode === "true");
      props.sidebarOpen();
    }
  }, []);

  const { authUser } = props;
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.optionsModal}
        closeAfterTransition
        disableBackdropClick
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={props.optionsModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{`Welcome Back ${authUser.user.username}`}</h2>
            <div className={classes.body}>
              <Button
                className={classes.margin}
                onClick={() => {
                  props.requestHelpSwitch(false);
                  props.sidebarOpen();
                }}
                variant="contained"
                color="primary"
                type="submit">
                HELP SOMEBODY
              </Button>
              <div className={classes.line}></div>
              <Button
                className={classes.margin}
                onClick={() => {
                  props.requestHelpSwitch(true);
                  props.sidebarOpen();
                }}
                variant="contained"
                color="primary"
                type="submit">
                REQUEST HELP
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authUser: state.authUser,
  optionsModal: state.authUser.optionsModal,
});

export default connect(mapStateToProps, {
  requestHelpSwitch,
  sidebarOpen,
})(OptionModal);
