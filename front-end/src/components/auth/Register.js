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


// import { useState } from "react";
// import { usePasswordValidation } from "./hooks/usePasswordValidation";

// function App() {  

// const [password, setPassword] = useState({
//       firstPassword: "",
//       secondPassword: "",
//      });
  
// const [
// validLength,
// hasNumber,
// upperCase,
// lowerCase,
// match,
// specialChar,
// ] = usePasswordValidation({
// firstPassword: password.firstPassword,
// secondPassword: password.secondPassword,
// });


// const setFirst = (event) => {
//   setPassword({ ...password, firstPassword: event.target.value });
// };
// const setSecond = (event) => {
//   setPassword({ ...password, secondPassword: event.target.value });
// };
// return (
// <div className='App'>
//   <div>
//     First Password:
//     <input onChange={setFirst} type='text' />
//   </div>
//   <div>
//     Second Password:
//     <input onChange={setSecond} type='text' />
//   </div>
//   <div>
//     <ul>
//       <li>
//         Valid Length: {validLength ? <span>✅ </span> : <span>False</span>}
//       </li>
//       <li>
//         Has a Number: {hasNumber ? <span>✅ </span> : <span>False</span>}
//       </li>
//       <li>
//         UpperCase: {upperCase ? <span>✅ </span> : <span>False</span>}
//       </li>
//       <li>
//         LowerCase: {lowerCase ? <span>✅ </span> : <span>False</span>}
//       </li>
//       <li>Match: {match ? <span>True</span> : <span>False</span>}</li>
//       <li>
//         Special Character:{" "}
//         {specialChar ? <span>True</span> : <span>False</span>}
//       </li>
//   </ul>
//   </div>
//   </div>
//   );
// }
// export default App;










//Real

class Register extends Component {
  constructor() {
    super();
    this.state = {
      value1:"",
      value2:"",
      name: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.handleChange1=(event)=>{
      this.setState({
          value1:event.target.value
      })
  }
  
  this.handleChange2=(event)=>{
      this.setState({
          value2:event.target.value
      })              
  }
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
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    let colour1="red",colour2="red",colour3="red",colour4="red",colour5="red";
    if(this.state.value1.length >= "8")
    {
        colour1="green";    
    }
    if(this.state.value1.match(/[A-Z]/))
    {
        colour2="green";    
    }
    if(this.state.value1.match(/[a-z]/))
    {
        colour3="green";    
    }
    if(this.state.value1.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/))
    {
        colour4="green";    
    }
    if(this.state.value1 === this.state.value2 && this.state.value1!=="" )
    {
        colour5="green";    
    }
    
    const style={
        boxShadow:"2px 2px 3px 3px #ccc",
        border:"2px #eee",
        padding:"20px",
        marginTop:"25px"
    }
         
  return (
    
      
  <div className="container"> 
  <div className="row">
  <div className="col-md-4"></div>
      
  
  <div className="col-md-4">
  <div style={style}>
  <form> 
        <p style={{fontWeight:"bold"}}>All checkmarks must turn green ✅ , password must have:</p>
        <p><i style={{color:colour1,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 8 characters</p>
        <p><i style={{color:colour2,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 1 uppercase letter</p>
        <p><i style={{color:colour3,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 1 lowercase letter</p>
        <p><i style={{color:colour4,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 1 number or special character</p>
        
      
        <div class="form-group">
          <label for="password">Password</label>
          <input type="text" class="form-control" value={this.state.value1} onChange={this.handleChange1} placeholder="Password"/>
        </div>
        <div class="form-group">
          <label for="password">Confirm Password</label>
          <input type="text" class="form-control" value={this.state.value2} onChange={this.handleChange2} placeholder="Confirm Password"/>
        </div> 
       {this.state.value2 === "" ? "" :
       (this.state.value1 === this.state.value2  ? <p style={{color:"green",fontWeight:"bold"}}> Passwords match </p> :
       <p style={{color:"red",fontWeight:"bold"}}> Passwords not match </p>
        )}
  </form>
  </div>
  </div>
 
      
  <div className="col-md-4"></div>
  </div>
  </div>
  );

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

              <TextField id='username' variant='outlined' label='Username'
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  className = {classnames("", {
                    invalid: errors.username
                  })}
                />
                <span className="red-text">{errors.username}</span>

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

// export default connect(
//   mapStateToProps,
//   { registerUser }
// )(withRouter(Register));






class App extends Component {
    
    constructor(){
        super();
        this.state={
            value1:"",
            value2:""
        }
        
        this.handleChange1=(event)=>{
            this.setState({
                value1:event.target.value
            })
        }
        
        this.handleChange2=(event)=>{
            this.setState({
                value2:event.target.value
            })              
        }
    }
     
  render() {
      
      let colour1="red",colour2="red",colour3="red",colour4="red",colour5="red";
      if(this.state.value1.length >= "8")
      {
          colour1="green";    
      }
      if(this.state.value1.match(/[A-Z]/))
      {
          colour2="green";    
      }
      if(this.state.value1.match(/[a-z]/))
      {
          colour3="green";    
      }
      if(this.state.value1.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/))
      {
          colour4="green";    
      }
      if(this.state.value1 === this.state.value2 && this.state.value1!=="" )
      {
          colour5="green";    
      }
      
      const style={
          boxShadow:"2px 2px 3px 3px #ccc",
          border:"2px #eee",
          padding:"20px",
          marginTop:"25px"
      }
           
    return (
        
    <div className="container"> 
    <div className="row">
    <div className="col-md-4"></div>
        
    
    <div className="col-md-4">
    <div style={style}>
    <form> 
          <p style={{fontWeight:"bold"}}>All checkmarks must turn green, password must have:</p>
          <p><i style={{color:colour1,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 8 characters</p>
          <p><i style={{color:colour2,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 1 uppercase letter</p>
          <p><i style={{color:colour3,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 1 lowercase letter</p>
          <p><i style={{color:colour4,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 1 number or special character</p>
          <p><i style={{color:colour5,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> Password === Confirm Password</p>
        
          <div class="form-group">
            <label for="password">Password</label>
            <input type="text" class="form-control" value={this.state.value1} onChange={this.handleChange1} placeholder="Password"/>
          </div>
          <div class="form-group">
            <label for="password">Confirm Password</label>
            <input type="text" class="form-control" value={this.state.value2} onChange={this.handleChange2} placeholder="Confirm Password"/>
          </div> 
         {this.state.value2 === "" ? "" :
         (this.state.value1 === this.state.value2  ? <p style={{color:"green",fontWeight:"bold"}}> Passwords match </p> :
         <p style={{color:"red",fontWeight:"bold"}}> Passwords not match </p>
          )}
    </form>
    </div>
    </div>
   
        
    <div className="col-md-4"></div>
    </div>
    </div>
    );
  }
}

export default App;
