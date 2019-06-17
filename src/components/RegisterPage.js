import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import firebase from '../firebase/firebase';
import axios from 'axios';


const styles = theme => ({
    '@global': {
        body: {
          backgroundColor: theme.palette.common.white,
        },
      },
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
})


class RegisterPage extends Component{

    state = {
      firstName:'',
      lastName:'',
      email:'',
      password:''
    }

    onChangeHandler = (e) => {
      this.setState({[e.target.name]:e.target.value});
    }
     onSubmit = (e) => {
      e.preventDefault();
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res =>{
        console.log(res.user.uid)
        const user ={uid:res.user.uid, email: this.state.email, name: { first: this.state.firstName, last: this.state.lastName }}
        axios.post('http://localhost:3000/api/user/create', user)
        .then(res =>{
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      })
      .catch(err =>{
        console.log(err.message)
      })


    }

    render(){
        const {classes} =  this.props
        return(
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} onSubmit={this.onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={this.onChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={this.onChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={this.onChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.onChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I Agree to the Terms and Conditions"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
    }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  uid:state.auth.uid
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage))