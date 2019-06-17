import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import StarRatings from 'react-star-ratings';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import {connect} from 'react-redux';
import {data} from '../utils/MoviesModel';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin:'2em'
  },
  paper: {
    padding: theme.spacing.unit * 2,
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
    rating:0
  }

  componentWillMount(){
    console.log("inside cdm")
    const id = this.props.match.params.imdbID;
    axios.get(`http://localhost:3000/api/getmovie/${id}`)
         .then(res => {
           axios.get(`http://www.omdbapi.com/?i=${res.data.data}&apikey=8c452f6e`)
                .then(res2 =>{
                  this.setState({movie:res2.data});
                })
                .catch(err => {
                  console.log(err.message);
                })
         })

    axios.get(`http://localhost:3000/api/review/m/${id}`)
         .then(res => {
           this.setState({reviews:res.data.data});
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

    axios.post(`http://localhost:3000/api/review/create`, post)
    .then(res => {
      console.log(res.data)
      this.setState({userReview:""})
      axios.get(`http://localhost:3000/api/review/m/${id}`)
      .then(res => {
        this.setState({reviews:res.data.data,rating:0});
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
        const {classes} = this.props;

        const md = this.state.movie

        return(
            <div className={classes.root}>
                <Grid container spacing={4} justify="center">
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                        <Grid container className={classes.root} spacing={4}>
                            <Grid item xs={12}>
                              <Grid container spacing={4}>
                                <Grid item>
                                  <Card className={classes.card} elevation={5}>
                                    <CardMedia
                                    className={classes.media}
                                    image={md.Poster}
                                    title={md.Title}
                                    />
                                  </Card>
                                </Grid>
                                <Grid item>
                                  <Grid container spacing={3} cols={2} justify="flex-end">
                                    <Grid item>
                                      <Typography variant="h5" component="p">
                                        {md.Title} ({md.Year})
                                      </Typography>
                                      <Typography variant="body1" component="p">
                                       {md.Rated} | {md.Runtime} | {md.Genre} | {md.Released} ({md.Country})
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
                                          Director: {md.Director}
                                      </Typography>
                                      <Typography variant="body1" component="p">
                                          Writer: {md.Writer}
                                      </Typography>
                                      <Typography variant="body1" component="p">
                                        Actors: {md.Actors}
                                      </Typography>
                                  </div>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                    </Grid>
                  <Grid item xs={8} direction="row">
                      <Card>
                        <CardContent>
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
                          <StarRatings
                          rating={this.state.rating}
                          starRatedColor="yellow"
                          changeRating={this.changeRating}
                          starRatedColor="yellow"
                          numberOfStars={5}
                          name='rating'
                          starDimension="30px"
                          starSpacing="5px"
                        />
                      </Grid>
                      <Grid item>
                      <Button variant="contained" color="primary" className={classes.button} onClick={this.onSubmitReviewClickHandler}>
                        Submit Review
                      </Button>
                      </Grid>
                        </CardContent>
                      </Card>
                  </Grid>
                  <Grid item xs={8}>
                      <Card>
                        <CardContent>
                          {this.state.reviews.map(r => (
                            <div>
                            <Typography variant="h5" component="p">
                              Reviews
                            </Typography>
                            <Divider/>
                            <Typography component="p">
                                <Grid item>
                                <StarRatings
                                rating={parseFloat(r.review.rating)}
                                starRatedColor="blue"
                                numberOfStars={5}
                                starRatedColor="yellow"
                                name='rating'
                                starDimension="20px"
                                starSpacing="5px"
                              />
                            </Grid>
                            </Typography>
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