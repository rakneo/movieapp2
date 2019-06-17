import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { CssBaseline } from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../redux/actions/auth';




const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appbar:{
    zIndex: theme.zIndex.drawer + 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class NavBar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchQuery:'',
      searchRequest:false,
      anchorEl: null,
      mobileMoreAnchorEl: null,
    }
    this.searchInputChangeHandler.bind(this);
    this.searchInputOnKeyPressHandler.bind(this);
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  }

  

  searchInputChangeHandler=(e)=>{
    const searchQuery = e.target.value;
    this.setState({searchQuery});
  }

  searchInputOnKeyPressHandler=(e)=>{
    if(this.state.searchRequest === false && this.state.searchQuery !== ''){
      this.setState({searchRequest:true})
    }
  }

  signOutHandler = () => {
      this.props.startLogout()
      this.handleMenuClose();
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const {searchQuery}=this.state
    
    if(this.state.searchRequest === true){
      return <Redirect to={"/"+searchQuery+"/s"}/>
    }

 

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.signOutHandler}>Sign out</MenuItem>
      </Menu>
    );

    const renderUserMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
       {(this.props.isAuthenticated)? 
        <div>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem></div>:       
        
        <div>
    
        </div>}
      </Menu>
    );



    return (
      <div className={classes.root}>
          <CssBaseline/>
        <AppBar className={classes.appbar}>
          <Toolbar>
          <Link to='/' className="brand-name-link">
          
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
             Movie App
            </Typography>
            </Link>
            <div className={classes.search}>
            <Paper>
            <InputBase
              className={classes.inputInput}
              placeholder="Search..."
              onChange={this.searchInputChangeHandler}
              value={this.state.searchQuery}
            
            />
            <IconButton className={classes.iconButton} aria-label="Search" onClick={this.searchInputOnKeyPressHandler}>
              <SearchIcon />
            </IconButton>
          </Paper>
            </div>
            <div className={classes.grow} />
            {(this.props.isAuthenticated)?
              <div>
              <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
            </div>
            :
            <div>
              <div className={classes.sectionDesktop}>
                  <Link to='/login' className="brand-name-link">
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    sign in
                  </Typography>
                  </Link>
              </div>
            </div>}
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderUserMobileMenu}

      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));