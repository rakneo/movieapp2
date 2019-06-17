import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
      width:650,
      height:650,
      position:'relative'
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

  
export default function MovieCarouselCard({image,description,movieID,title}){
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
                <Typography variant="h4" component="p">
                    {title}
                </Typography>
            </div>
        </CardContent>
      </CardContent>
    </Card>
  );
}