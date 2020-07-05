import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import validator from "validator";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authUserActions";
import { failureToast } from "../Toastify/Toast";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      fontFamily: "Roboto",
    },
  },
  invalidMessage: {
    color: "red",
  },
  margin: {
    margin: theme.spacing(1),
    width: "15ch",
  },
}));

const Login = (props) => {
  const [values, setValues] = useState({
    email: {
      name: "email",
      value: "",
      error: {
        message: "",
        noError: null,
      },
    },
    password: {
      name: "password",
      value: "",
      error: {
        message: "",
        noError: null,
      },
    },
  });
  const [validate, setValidate] = useState({
    emailError: {
      noError: true,
      message: "",
    },
    passwordError: {
      noError: true,
      message: "",
    },
  });
  const [canSubmit, setCanSubmit] = useState(false);

  const checkInputValidation = (errorState, inputName, inputValue) => {
    switch (inputName) {
      case "email":
        let isEmail = validator.isEmail(inputValue);

        if (!isEmail) {
          errorState.emailError.noError = true;
          errorState.emailError.message = "It must be an email";
          return errorState;
        } else {
          errorState.emailError.noError = false;
          errorState.emailError.message = "";
          return errorState;
        }

      case "password":
        let validatedPassword;
        validatedPassword = !validator.isEmpty(inputValue);

        if (!validatedPassword) {
          errorState.passwordError.noError = true;
          errorState.passwordError.message = "Password cannot be empty";
          return errorState;
        } else {
          errorState.passwordError.noError = false;
          errorState.passwordError.message = "";
          return errorState;
        }

      default:
        return errorState;
    }
  };

  const handleChange = (event) => {
    let inputForm = {
      ...values,
    };

    inputForm[event.target.name].value = event.target.value;

    let isValidatedCheck = checkInputValidation(
      validate,
      event.target.name,
      event.target.value
    );

    inputForm["email"].error = isValidatedCheck.emailError;
    inputForm["password"].error = isValidatedCheck.passwordError;

    setValidate(isValidatedCheck);
    setValues(inputForm);

    let errorArray = [];

    for (let key in validate) {
      errorArray.push(validate[key].noError);
    }

    if (errorArray.includes(true)) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = values;

    try {
      let inputForm = {
        ...values,
      };

      const success = await props.loginUser({
        email: email.value,
        password: password.value,
        requestHelp: false,
        lat: props.coords.lat,
        lng: props.coords.lng,
      });

      inputForm["email"].value = "";
      inputForm["password"].value = "";

      setValues(inputForm);
      props.history.push("/option");
    } catch (e) {
      failureToast(e);
    }
  };

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <h3>Login</h3>
      </div>
      <div>
        <TextField
          error={values.email.error.noError ? true : false}
          label="Email"
          name="email"
          defaultValue={values.email.value}
          helperText={values.email.error.message}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          error={values.password.error.noError ? true : false}
          label="Password"
          name="password"
          type="password"
          defaultValue={values.password.value}
          helperText={values.password.error.message}
          onChange={handleChange}
        />
      </div>
      <br />
      <Button
        className={classes.margin}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        size="small"
        disabled={!canSubmit}
        type="submit">
        Submit
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
    socket: state.authUser.socket,
    coords: state.directions.userLoc,
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
