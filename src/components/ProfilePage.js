import React, {Component} from 'react';
import classNames from 'classnames';
import Cropper from 'react-cropper';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from "@material-ui/core/Modal";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from '@material-ui/core/colors/green';
import avatar from '../Images/avatar.png';
import 'cropperjs/dist/cropper.css';

const styles = theme =>({

    root:{
        flexGrow:1,
        marginTop:'6em'
    },
    profileCard:{
        maxwidth:345,
    },
    profilePicture:{
        height:345,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    modal: {
        position: 'absolute',
        width: theme.spacing(50),
        top:"50%",
        left:"50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius:5,
        padding: theme.spacing(4),
        outline: 'none',
    },


});

class ProfilePage extends Component{

    state={
        profileAvatar:null,
        profileAvatarUrl: avatar,
        loaded:0,
        modalOpen:false,
        progressLoading:false,
        progressSuccess:false,
    }
    handleOpen = () => {
        this.setState({ modalOpen: true });
    };

    handleClose = () => {
        this.setState({ modalOpen: false });
    };

    handleUploadClick = () =>{
        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true,
                },
                () => {
                    const canvas = this.refs.cropper.getCroppedCanvas();
                    this.timer = setTimeout(() => {
                        this.setState({
                            loading: false,
                            success: true,
                            modalOpen:false,
                            profileAvatarUrl:canvas.toDataURL(),
                        });

                        // document.getElementById("avatarImage").src = canvas.toDataURL();

                    }, 2000);
                },
            );
        }
    };

    avatarHandleChange = (event) =>{
        const file = event.target.files[0];
        this.setState({profileAvatar:file,},()=>{
            console.log(this.state.profileAvatar);
            const done = (url) =>{
                this.setState({profileAvatarUrl:url});
                this.handleOpen();
            };
            let reader;
            if (window.URL) {
                done(window.URL.createObjectURL(file));
            } else if (FileReader) {
                reader = new FileReader();
                reader.onload = function (event) {
                    done(reader.result);
                };
                reader.readAsDataURL(file);
            }
        });


    };

    render(){

        const {classes} = this.props;
        const {profileAvatarUrl, loading, success} = this.state;
        const buttonClassname = classNames({
                [classes.buttonSuccess]: success,
            })

        return(
            <div className={classes.root}>
             <React.Fragment>
                <Container>
                        <Grid
                        container
                        direction="row"
                        spacing={5}
                        justify="center"
                        alignItems="center">
                            <Grid item xs={4}>
                                <Card className={classes.profileCard} elevation={6}>
                                    <CardActionArea>
                                        <div>                                            
                                                <CardMedia
                                                    className={classes.profilePicture}
                                                    image={profileAvatarUrl}
                                                    title="Profile Picture"
                                                    onClick={()=>{document.getElementById("avatarfile").click();}}    
                                                />
                                                <input accept="image/*" type="file" style={{display:'none'}} id="avatarfile" onChange={this.avatarHandleChange}/>
                                             
                                        </div>
                                    </CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        Rakshith Vikramraj
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                                      </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={8}>

                            </Grid>
                        </Grid>
                    </Container> 
                    </React.Fragment>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                    >
                        <div className={classes.modal}>
                            <Typography variant="h6" id="modal-title" align="center">
                                Edit Your Profile Picture
                            </Typography>
                            <Cropper
                                ref='cropper'
                                src={this.state.profileAvatarUrl}
                                style={{height: 300, width: '100%'}}
                                // Cropper.js options
                                aspectRatio={1 / 1}
                                guides={true}/>

                                &nbsp;

                            <div className={classes.wrapper}>
                                <Button
                                    style={{width:'100%'}}
                                    variant="contained"
                                    color="primary"
                                    className={buttonClassname}
                                    disabled={loading}
                                    onClick={this.handleUploadClick}
                                >
                                    Upload
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </div>
                    </Modal>           
               </div>);
    }
}

export default withStyles(styles)(ProfilePage);