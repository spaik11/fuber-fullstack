import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { requestHelp } from "../redux/actions/authUserActions";

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
  const [open, setOpen] = React.useState(true);

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
            <h2 id="transition-modal-title">{`Welcome Back`}</h2>
            <div className={classes.body}>
              <Button
                className={classes.margin}
                onClick={() => props.requestHelp(false)}
                variant="contained"
                color="primary"
                type="submit">
                HELP SOMEBODY
              </Button>
              <div className={classes.line}></div>
              <Button
                className={classes.margin}
                onClick={() => props.requestHelp(true)}
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
});

export default connect(mapStateToProps, {
  requestHelp,
})(OptionModal);
