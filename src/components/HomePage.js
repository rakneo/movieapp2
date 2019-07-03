import React from 'react';
import MovieCarousal from './MovieCarousel';
import MoviesHorizontalList from './MoviesHorizontalList';

function HomePage(){
        return (
            <div>
                <MovieCarousal/>
                <MoviesHorizontalList list_type="popular" title="Popular"/>
                <MoviesHorizontalList list_type="top_rated" title="Top Rated"/>
            </div>
            
        )
   
} 

export default HomePage;