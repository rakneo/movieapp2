import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MovieCardItem from './MovieCardItem';
import {MovieCardLoader} from './SkeletonLoaders';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
      },

});

class MovieTrendingGrid extends Component{

    state = {
        cardData:[],
        cardContent:false
    }

    async componentWillMount(){
        await axios.get("http://139.59.71.68/api/movie/trending")
               .then( res =>{
                this.setState({cardData:res.data.data.slice(0,4),cardContent:true});
               })
               .catch(err => {
                 console.log(err);
               })
    }


    render(){
        const {classes} = this.props;
        const {cardData} = this.state;
        return(
                <GridList cellHeight={300} cols={2} className={classes.gridList}>
                        {(this.state.cardContent)?cardData.map(tile => (
                        <GridListTile key={tile.id}>
                            <MovieCardItem
                                id={tile.id}
                                title={tile.title}
                                year={tile.release_date}
                                rating={tile.vote_average}
                                img={`https://image.tmdb.org/t/p/w500${tile.backdrop_path}`}
                            />
                        </GridListTile>
                        )):
                        [0,1,2,3].map(tile => (
                            <GridListTile key={tile}>
                                <MovieCardLoader/>
                            </GridListTile>
                            ))}
                </GridList>
        );
    }
}

export default withStyles(styles)(MovieTrendingGrid);