import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ContentLoader from "react-content-loader"
import Button from '@material-ui/core/Button';
import StarRatings from 'react-star-ratings';
import Divider from '@material-ui/core/Divider';
import empty from '../Images/empty.svg';


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop:74
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  card: {
    width:200,
    height:350,
    position: 'relative',
  },
  media: { 
    height:0,
    paddingTop:'177.78%',
  },
});


class MovieDetailCard extends Component{

  state = {
    movie:{},
    reviews:[],
    userReview:'',
    rating:0,
    contentReady:false,
    reviewReady:false
  }

  componentWillMount(){
    const id = this.props.match.params.imdbID;
    axios.get(`http://139.59.71.68/api/getmovie/${id}`)
         .then(res => {
           axios.get(`http://www.omdbapi.com/?i=${res.data.data}&apikey=8c452f6e`)
                .then(res2 =>{
                  this.setState({movie:res2.data, contentReady:true});
                })
                .catch(err => {
                  console.log(err.message);
                })
         })

    axios.get(`http://139.59.71.68/api/review/m/${id}`)
         .then(res => {
           this.setState({reviews:res.data.data, reviewReady:true});
         })
         .catch(err =>{
           console.log(err.message);
         })
  }

  reviewInputChangeHandler = (e) => {
    this.setState({userReview:e.target.value})
  }

  changeRating = ( newRating, name ) => {
    this.setState({rating:newRating})
  }

  onSubmitReviewClickHandler = () => {
    const id = this.props.match.params.imdbID;
    const post = {
      uid:this.props.uid,
      movie:id,
      name:this.props.name,
      review:{
        rating:this.state.rating,
        description:this.state.userReview
      }
    }

    axios.post(`http://139.59.71.68/api/review/create`, post)
    .then(res => {
      console.log(res.data)
      this.setState({userReview:""})
      axios.get(`http://139.59.71.68/api/review/m/${id}`)
      .then(res => {
        this.setState({reviews:res.data.data,rating:0, reviewReady:true});
        console.log(res.data)
      })
      .catch(err =>{
        console.log(err.message);
      })
    })
    .catch(err=>{
      console.log(err.message)
    })

   
  }


    render(){
        const {classes, isAuthenticated} = this.props;

        const md = this.state.movie

        return(
            <div className={classes.root}>
                <Grid container spacing={1} justify="center" >
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                        <Grid container spacing={4} alignItems="center" justify="center">
                            <Grid item xs={12}>
                              <Grid container spacing={4}>
                                <Grid item>
                                 {(this.state.contentReady===false)?  
                                  <Card className={classes.card} elevation={6}>
                                  <ContentLoader 
                                  height={350}
                                  width={200}
                                  speed={2}
                                  primaryColor="#f3f3f3"
                                  secondaryColor="#ecebeb"
                                >
                             
                                </ContentLoader>
                                </Card>:
                                <Card className={classes.card} elevation={5}>
                                <CardMedia
                                className={classes.media}
                                image={md.Poster}
                                title={md.Title}
                                />
                              </Card>} 
                                </Grid>
                                <Grid item xs={8}>

                                  {(!this.state.contentReady)?
                                    <ContentLoader 
                                    height={400}
                                    width={600}
                                    speed={2}
                                    primaryColor="#f3f3f3"
                                    secondaryColor="#ecebeb"
                                  >
                                  <rect x="35" y="44" rx="0" ry="0" width="340" height="20" /> 
                                  <rect x="35" y="74" rx="0" ry="0" width="456" height="20" /> 
                                  <rect x="520" y="31" rx="0" ry="0" width="65" height="65" /> 
                                  <rect x="35" y="114" rx="0" ry="0" width="549" height="189" />
                                  </ContentLoader>
                                  :
                                  <div>
                                  <Grid container cols={2} justify="space-between">
                                    <Grid item>
                                          <Typography variant="h5" component="p">
                                            {md.Title} ({md.Year})
                                          </Typography>
                                          <Typography variant="body2" component="p">
                                           {md.Rated} | {md.Runtime} | {md.Genre} | {md.Released}
                                          </Typography>
                                    </Grid>
                                    <Grid item>
                                    {(md.imdbRating === undefined || md.imdbRating === "N/A")?<Typography gutterBottom variant="body1" component="p"  style={{color:'white',fontSize:'0.75rem'}}>
                                    N/A
                                      </Typography>:
                                      <div>
                                      <StarRatings
                                      rating={md.imdbRating/10}
                                      starDimension="60px"
                                      starRatedColor="yellow"
                                      numberOfStars={1}
                                      name='rating'/>
                                      {md.imdbRating}/10
                                    </div>
                                    }
                                    </Grid>
                                  </Grid>
                                  <Divider variant="middle" />
                                  <Grid item >
                                  <div className="storyline-div">
                                      <Typography variant='h5' component="p">
                                        Storyline
                                      </Typography>
                                      <Typography variant="body2" component="p">
                                      {md.Plot}
                                      </Typography>
                                      <Divider/>
                                      <Typography variant="body1" component="p">
                                          <b>Director:</b> {md.Director}
                                      </Typography>
                                      <Typography variant="body1" component="p">
                                          <b>Writer:</b> {md.Writer}
                                      </Typography>
                                      <Typography variant="body1" component="p">
                                        <b> Actors:</b> {md.Actors}
                                      </Typography>
                                  </div>
                                  </Grid>
                                  </div>

                                  }  

                                  
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                    </Grid>
                  <Grid item xs={8}>
                      <Card>
                        <CardContent>
                        {(isAuthenticated)?
                          <div>
                              <Grid item>
                                  <StarRatings
                                  rating={this.state.rating}
                                  starRatedColor="yellow"
                                  changeRating={this.changeRating}
                                  numberOfStars={5}
                                  name='rating'
                                  starDimension="30px"
                                  starSpacing="5px"
                                />
                             </Grid>
                                <Grid item>
                                <TextField
                                id="outlined-dense-multiline"
                                label="Write Your Review Here..."
                                margin="dense"
                                variant="outlined"
                                multiline
                                fullWidth
                                rowsMax="12"
                                value={this.state.userReview}
                                onChange={this.reviewInputChangeHandler}
                              /> 
                              </Grid>
                         
                              <Grid item>
                              <Button variant="contained" color="primary" className={classes.button} onClick={this.onSubmitReviewClickHandler}>
                                Submit Review
                              </Button>
                              </Grid>
                          </div>:
                            <div>
                              <Typography variant="h6" component="p" align="center">
                                 <Link to='/login'>login</Link> to rate this movie
                              </Typography>
                            </div>
                        }
                        </CardContent>
                      </Card>
                  </Grid>
                  <Grid item xs={8}>
                      <Card>
                        <CardContent>
                        
                        <Typography variant="h5" component="p">
                              Reviews
                            </Typography>
                           {(!this.state.reviewReady)?<img src={empty} alt="illustration" style={{width:200*2, height:300*2}}/>:<div></div>}
                          {this.state.reviews.map(r => (
                            <div key={r.name+r.review.description}>
                            
                            <Divider/>
                    
                                <Grid item>
                                <StarRatings
                                rating={parseFloat(r.review.rating)}
                                starRatedColor="yellow"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing="5px"
                              />
                            </Grid>
                        
                            <Typography component="p">
                               {r.review.description}
                            </Typography>
                            <Typography component="p">
                              Review by {r.name}
                            </Typography>
                            <Divider/>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                  </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  uid:state.auth.uid,
  name:`${state.user.firstname} ${state.user.lastname}`
});

export default connect(mapStateToProps)(withStyles(styles)(MovieDetailCard));