import React from 'react';
import MovieCarousal from './MovieCarousel';
import MoviesHorizontalList from './MoviesHorizontalList';

function HomePage(){
        return (
            <div>
                <MovieCarousal/>
                <MoviesHorizontalList/>
                <MoviesHorizontalList/>
                <MoviesHorizontalList/>
                <MoviesHorizontalList/>
            </div>
            
        )
   
} 

export default HomePage;