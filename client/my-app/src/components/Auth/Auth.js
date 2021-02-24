import React, { useState } from "react";
import {
  Avatar,
  Button,
  Typography,
  Paper,
  Container,
  Grid,
} from "@material-ui/core";
import Input from "./Input";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import useStyles from "./Auth-Styles";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import {
  authAction,
  signUpAsync,
  signInAsync,
} from "../../StateSlices/authSlilce";
import { useHistory } from "react-router-dom";
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // Googl Cclient Secret = H3kEJSgibltAym20T0Dgmzz7

  //   handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUpAsync(formData, history));
    } else {
      dispatch(signInAsync(formData, history));
    }
  };
  //   handleSubmit //

  //   handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //   handleChange //

  //   handleShowPassword
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  //   handleShowPassword //

  // switchMode
  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
    setShowPassword(false);
  };
  // switchMode //

  // googleSuccess
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(authAction({ result, token }));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  // googleSuccess //

  // googleFailure
  const googleFailure = (error) => {
    console.log("error :>> ", error);
    console.log("Google Signin was unsuccessfull , Try again later");
  };
  // googleFailure //

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "SignUp" : "Signin"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId="803591034357-gq6jofaek93snadbntojr23s22gt1lf5.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.enabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {isSignUp
                ? "Already have an account ? Sign In"
                : "Don't have an account Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
