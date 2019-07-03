import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter, Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    card: {
      width:650,
      height:650,
      position:'relative',
      borderRadius:10
    },
    media: { 
        height:650,
        width:650,
      },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    overlay: {
        width:'100%',
        height:300,  
        position: 'absolute',
        top: '70%',
        left: '0',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)'
     }
  });

  
function MovieCarouselCard({image,description,movieID,title, history}){
  const classes = useStyles();
  return (
    <Card className={classes.card}>
    <CardMedia
          className={classes.media}
          image={`${image}`}
          title={title}
        />
      <CardContent>
        <CardContent className={classes.overlay}>
            <div className="card-overlay-div-carousal">
                <Typography variant="h4" component="p" >
                  <Link to={`/${movieID}/m`} className="brand-name-link">{title}</Link>
                    
                </Typography>
            </div>
        </CardContent>
      </CardContent>
    </Card>
  );
}

export default withRouter(MovieCarouselCard);