import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import validator from "validator";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authUserActions";

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
      value: "",
      error: {
        message: "",
        noError: null,
      },
    },
    password: {
      value: "",
      error: {
        message: "",
        noError: null,
      },
    },
  });
  const [validate, setValidate] = useState({
    emailError: {
      noError: null,
      message: "",
    },
    passwordError: {
      noError: null,
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
        let validatedEmail;
        validatedEmail = validator.isEmail(inputValue);

        if (!validatedEmail) {
          errorState.emailError.noError = validatedEmail;
          errorState.emailError.message = "It must be an email";
          return errorState;
        } else {
          errorState.emailError.noError = validatedEmail;
          errorState.emailError.message = "";
          return errorState;
        }

      case "password":
        let validatedPassword;
        validatedPassword = !validator.isEmpty(inputValue);

        if (!validatedPassword) {
          errorState.passwordError.noError = validatedPassword;
          errorState.passwordError.message = "Password cannot be empty";
          return errorState;
        } else {
          errorState.passwordError.noError = validatedPassword;
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

    setValues(inputForm);

    // let isValidatedCheck = checkInputValidation(
    //   validate,
    //   event.target.name,
    //   event.target.value
    // );

    // inputForm["email"].error = isValidatedCheck.emailError;
    // inputForm["password"].error = isValidatedCheck.passwordError;

    // setValidate(isValidatedCheck);

    // if (
    //   inputForm["email"].error.noError === false ||
    //   inputForm["password"].error.noError === false
    // ) {
    //   setCanSubmit(true);
    //   return;
    // }

    // if (
    //   inputForm["email"].error.noError === true &&
    //   inputForm["password"].error.noError === true
    // ) {
    //   setCanSubmit(false);
    //   return;
    // } else {
    //   setValues(inputForm);
    //   return;
    // }
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

      inputForm["email"].value = "";
      inputForm["password"].value = "";
    } catch (e) {
      console.log(e);
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
      <br />
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
