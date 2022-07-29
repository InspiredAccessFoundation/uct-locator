import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container maxWidth="sm">
        <div style={{ marginTop: "4rem" }} className="row">
              <Button variant="outlined" startIcon={<HomeIcon />} href="/">
                Home
               </Button>
              <h2>
               <b>Login below</b>
              </h2>
            <form noValidate onSubmit={this.onSubmit}>
              <Stack spacing = {1}>
                <TextField id="email" label="Email" variant="outlined" 
                  onChange={this.onChange}
                  value={this.state.email}
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>

                <TextField id="password" label="Password" type="password" variant="outlined"
                  onChange={this.onChange}
                  value={this.state.password}
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                  />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
                </Stack>
                <Button
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
                <p className="grey-text text-darken-1">
                Don't have an account?
                  <Button variant="text" href="/register">
                    Register
                  </Button>
                </p>
             </form>
          </div>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
