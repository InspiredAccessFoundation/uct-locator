import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to landing page
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container maxWidth='sm'>
        <div style={{ marginTop: "4rem" }} className="row">
           <Button variant="outlined" startIcon={<HomeIcon />} href="/">
                Home
               </Button>
              <h2>
                <b>Register below </b>
              </h2>
            <form noValidate onSubmit={this.onSubmit}>
            <Stack spacing = {1}>
              <TextField id='name' variant='outlined' label='Name'
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />

                <span className="red-text">{errors.name}</span>

              <TextField id='email' variant='outlined' label='Email'
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <span className="red-text">{errors.email}</span>

               <TextField id='password' variant='outlined' label='Password' type='password'
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <span className="red-text">{errors.password}</span>

                <TextField id='password2' variant='outlined' label='Confirm Password' type="password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <span className="red-text">{errors.password2}</span>
              </Stack>
                <Button variant="contained" type="subimt">
                  Sign Up
                </Button>
                <p className="grey-text text-darken-1">
                Already have an account? 
                <Button href='/login'>Login</Button>
              </p>
            </form>
            </div>
        </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
