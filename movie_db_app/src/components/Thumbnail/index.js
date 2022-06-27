import React from 'react';
//Styles
import { Image } from './Thumbnail.style';

const Thumbnail = ({ image, movieId, clickable }) => (
  <div>
    <Image src={image} alt='movie-thumbnail' />
  </div>
)

export default Thumbnail;