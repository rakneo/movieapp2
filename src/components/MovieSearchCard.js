import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import StarRatings from 'react-star-ratings';
import {Redirect} from 'react-router-dom';


const styles = theme => ({
    card: {
        width:200,
        position: 'relative',
        margin:5
      },
      media: { 
        height:0,
        paddingTop:'177.78%',
      },
      overlay: {
        width:200,  
        position: 'absolute',
        top: '70%',
        left: '0',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)'
     }
})

class MovieSearchCard extends Component{

    state = {
        redirect:false
    }

    handleClick = () =>{
        this.setState({redirect:true});
    }


    render(){
        const {id,title,year,rating,img,classes} = this.props;

        if(this.state.redirect === true){
            return <Redirect to={"/"+id+"/m"}/>
        }

        return(
            <Card className={classes.card} onClick={this.handleClick}>
                <CardMedia
                className={classes.media}
                image={img}
                title={title}
                />
                <CardContent className={classes.overlay}>
                <div className="card-overlay-div">
                <Typography gutterBottom variant="subtitle2" component="p" style={{color:'white', fontSize:'0.85rem'}}>
                    {title}
                </Typography>
                <Typography gutterBottom variant="body1" component="p"  style={{color:'white',fontSize:'0.75rem'}}>
                    {year}
                </Typography>
                
                {(rating === "N/A")?<Typography gutterBottom variant="body1" component="p"  style={{color:'white',fontSize:'0.75rem'}}>
                N/A
            </Typography>:<StarRatings
            rating={rating/2}
            starDimension="20px"
            starRatedColor="yellow"
            numberOfStars={5}
            name='rating'/>}
            </div>
            </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(MovieSearchCard);