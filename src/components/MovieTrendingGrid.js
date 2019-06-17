import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MovieCardItem from './MovieCardItem';

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
        cardData:[]
    }

    async componentWillMount(){
        await axios.get("http://localhost:3000/api/movie/trending")
               .then( res =>{
                this.setState({cardData:res.data.data.slice(0,4)});
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
                        {cardData.map(tile => (
                        <GridListTile key={tile.id}>
                            <MovieCardItem
                                id={tile.id}
                                title={tile.title}
                                year={""}
                                rating={tile.vote_average}
                                img={`https://image.tmdb.org/t/p/w500${tile.backdrop_path}`}
                            />
                        </GridListTile>
                        ))}
                </GridList>
        );
    }
}

export default withStyles(styles)(MovieTrendingGrid);