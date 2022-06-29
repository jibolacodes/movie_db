import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
//Styles
import { Image } from './Thumbnail.style';

const Thumbnail = ({ image, movieId, clickable }) => (
  <div>
  {clickable? (
    <Link to={`/${movieId}`}>
    <Image src={image} alt='movie-thumbnail' />
    </Link>
  ) : (
    <Image src={image} alt='movie-thumbnail' />
  )}
  </div>
);

Thumbnail.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.string,
  clickable: PropTypes.bool
}



export default Thumbnail;