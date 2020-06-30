import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import validator from "validator";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authUserActions";
import { successToast, failureToast } from "../Toastify/Toast";

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

  useEffect(() => {
    console.log(props);
  }, [props]);

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

    if (
      inputForm["email"].error.noError === false ||
      inputForm["password"].error.noError === false
    ) {
      setCanSubmit(true);
      return;
    }

    if (
      inputForm["email"].error.noError === true &&
      inputForm["password"].error.noError === true
    ) {
      setCanSubmit(false);
      return;
    } else {
      setValues(inputForm);
      return;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = values;

    try {
      let inputForm = {
        ...values,
      };

      await props.loginUser({
        email: email.value,
        password: password.value,
      });

      successToast("Welcome Back!");

      inputForm["email"].value = "";
      inputForm["password"].value = "";

      setValues(inputForm);
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
          label="Email"
          name="email"
          value={values.email.value}
          onChange={handleChange}
        />
        {values.email.error.noError && (
          <p className={classes.invalidMessage}>{values.email.error.message}</p>
        )}
      </div>
      <div>
        <TextField
          label="Password"
          name="password"
          type="password"
          value={values.password.value}
          onChange={handleChange}
        />
        {values.password.error.noError && (
          <p className={classes.invalidMessage}>
            {values.password.error.message}
          </p>
        )}
      </div>
      <br />
      <Button
        className={classes.margin}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        size="small"
        type="submit">
        Submit
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
