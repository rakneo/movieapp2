import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from '../utils/Pagination';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MovieCarouselCard from './MovieCarouselCard';
import MovieTrendingGrid from './MovieTrendingGrid';
import {MovieCarousalLoader} from './SkeletonLoaders';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


class MovieCarousal extends React.Component {
  state = {
    index: 0,
    slideData:null
  };


  async componentWillMount(){
    await axios.get("http://139.59.71.68/api/movie/now_playing",{headers: {
      'Access-Control-Allow-Origin': '*',
    }})
               .then( res =>{
                this.setState({slideData:res.data.data.slice(0,5)});
               })
               .catch(err => {
                 console.log(err);
               })
  }

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;
    const {slideData} = this.state;
    return (
          <Grid container 
                direction="row"
                justify="space-evenly"
                alignItems="center">
              <Grid item>
              <div style={{width:650, height:650, margin:'3em'}}>
              <Typography variant="h4" component="p">
                Now Playing
                </Typography>
                <div>
                
                  <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    {(slideData === null)?
                      <MovieCarousalLoader/> 
                      :slideData.map(slide => (
                      <MovieCarouselCard
                        key={slide.id} 
                        image={`https://image.tmdb.org/t/p/w500${slide.backdrop_path}`} 
                        description={slide.overview} 
                        movieID={slide.id} 
                        title={slide.title}/>
                    ))}
                  </AutoPlaySwipeableViews>
                  <Pagination dots={5} index={index} onChangeIndex={this.handleChangeIndex} />
                </div>
                </div>
              </Grid>
              <Grid item>
                  <div style={{width:650, height:650}}>
                      <Typography variant="h4" component="p">
                        Trending
                      </Typography>
                      <MovieTrendingGrid/>
                  </div>
              </Grid>
          </Grid>
    );
  }
}

export default MovieCarousal;