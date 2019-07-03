import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { startLogin, startLoginGoogle } from '../redux/actions/auth';
import { Divider } from '@material-ui/core';
import GoogleIcon from '../Images/GoogleIcon';



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
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      vert:{
        width:0,
        height:24,
        backgroundColor:'black',
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1)
      }
})



class LoginPage extends Component{

    state = {
      email:'',
      password:'',
      isAuthenticated:false
    }

    componentDidMount(){
      const {isAuthenticated} = this.props;

      if(isAuthenticated){
        this.setState({isAuthenticated:true});
      }

    }

    onEmailChangeHandler = (e) => {
      const email = e.target.value;
      this.setState({email});
    }

    onPasswordChangeHandler = (e) => {
      const password = e.target.value;
      this.setState({password});
    }

    onSubmit = (e) =>{
      e.preventDefault();
      this.props.startLogin(this.state.email, this.state.password);
    }

    render(){

        const {classes} = this.props

       return(

         <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                onChange={this.onEmailChangeHandler}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onPasswordChangeHandler}
              />
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Divider style={{marginTop:15, marginBottom:15}}/>
          <div>
              <Button size="large" variant="contained" fullWidth style={{backgroundColor:'white'}} onClick={this.props.startLoginGoogle}>
                  <GoogleIcon/>
                  <Divider className={classes.vert}/>
                  sign in with google
              </Button>
          </div>
        </Container>
       )
    }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, password)  => dispatch(startLogin(email, password)),
  startLoginGoogle: () => dispatch(startLoginGoogle())
})

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LoginPage));