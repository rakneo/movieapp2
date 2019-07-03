import React from 'react';
import ContentLoader from "react-content-loader";

export const  MovieCardLoader = () => (
  <ContentLoader 
    height={300}
    width={300}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="358" height="240" /> 
    <rect x="0" y="251" rx="0" ry="0" width="206" height="21" /> 
    <rect x="0" y="277" rx="0" ry="0" width="243" height="21" />
  </ContentLoader>
)

export const MovieCarousalLoader = () => (
    <ContentLoader 
    height={650}
    width={650}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="748" height="502" /> 
    <rect x="0" y="567" rx="0" ry="0" width="560" height="60" /> 
    <rect x="0" y="526" rx="0" ry="0" width="560" height="30" />
  </ContentLoader>
)



