import React, {Component} from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import MovieCardItem from './MovieCardItem';
import {MovieCardLoader} from './SkeletonLoaders';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { Typography } from '@material-ui/core';
import axios from 'axios';

   const Menu = (list, selected) =>
      list.map(el => {
        
        const {id, title, release_date, backdrop_path, vote_average} = el;
  
        return <MovieCardItem id={id} title={title} year={release_date} rating={vote_average} img={`https://image.tmdb.org/t/p/w500${backdrop_path}`} key={id}/>;
      });

   const SkeletonMenu = () => [0,].map(l => (
      <div style={{width:280, height:280}}>
      <MovieCardLoader/>
      </div>
   ))   
    
  const Arrow = ({direction}) =>(
    <div>
      <Paper elevation={10} style={{borderRadius:'50%',width:36,height:36, padding:6, margin:2}}>
      {(direction==='left')?<ArrowLeft/>:<ArrowRight/>}
      </Paper>
    </div>
  ) ;

  const arrowLeft = Arrow({direction:'left'});
  const arrowRight = Arrow({direction:'right'});

  const selected = 'item3';
  
  class MoviesHorizontalList extends Component {
    
  
    state = {
      selected,
      menu:[],
      ready:false
    };
  
    onSelect = key => {
      this.setState({ selected: key });
    }

    async componentWillMount(){
      const {list_type} = this.props;
      let url ='';
      if(list_type==='popular'){
        url='http://139.59.71.68/api/movie/popular';
      }else if(list_type==='top_rated'){
        url='http://139.59.71.68/api/movie/top_rated';
      }

      await axios.get(url)
           .then(res=>{
            this.setState({menu:Menu(res.data.data, selected), ready:true}); 
           })
           .catch(err=>{
             console.log(err.message);
           })

    }


    componentWillUnmount(){
      this.setState({})
    }
  
  
    render() {
      const { selected,ready,menu } = this.state;

      const dummy = SkeletonMenu();
      
      return (
        <div className="App">
           <Grid container 
                direction="row"
                justify="center"
                alignItems="center"
                style={{marginTop:'2em'}}>
           <Grid item xs={4}>
            <Typography variant="h3" component="p" align="center">
              {this.props.title}
            </Typography>
           </Grid>      
           <Grid item xs={8}>
            <ScrollMenu
              data={(ready)?menu:dummy}
              scrollToSelected={true}
              selected={selected}
              arrowLeft={arrowLeft}
              arrowRight={arrowRight}
              hideSingleArrow={true}
              wheel={false}
              transition={0.4}
              onSelect={this.onSelect}
            />
          </Grid>
      </Grid>
        </div>
      );
    }
  }

export default MoviesHorizontalList;

