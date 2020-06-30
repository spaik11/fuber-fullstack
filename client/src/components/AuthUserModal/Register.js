import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import validator from "validator";
import { connect } from "react-redux";
import { createUser } from "../redux/actions/authUserActions";
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

const Register = (props) => {
  const [values, setValues] = useState({
    username: {
      name: "username",
      value: "",
      error: {
        message: "",
        noError: null,
      },
    },
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
    usernameError: {
      noError: true,
      message: "",
    },
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
        let validatedEmail;
        validatedEmail = validator.isEmail(inputValue);

        if (!validatedEmail) {
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

      case "username":
        let validatedUsername;
        validatedUsername = !validator.isEmpty(inputValue);

        if (!validatedUsername) {
          errorState.usernameError.noError = true;
          errorState.usernameError.message = "Username cannot be empty";
          return errorState;
        } else {
          errorState.usernameError.noError = false;
          errorState.usernameError.message = "";
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

    inputForm["username"].error = isValidatedCheck.usernameError;
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
    const { username, email, password } = values;

    try {
      let inputForm = {
        ...values,
      };

      await props.createUser({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      successToast("Welcome to Fuber!");

      inputForm["username"].value = "";
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
        <h3>Register</h3>
      </div>
      <div>
        <TextField
          error={values.username.error.noError ? true : false}
          label="Username"
          name="username"
          defaultValue={values.username.value}
          helperText={values.username.error.message}
          onChange={handleChange}
        />
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
  };
};

export default connect(mapStateToProps, { createUser })(Register);
