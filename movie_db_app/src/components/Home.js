import React from 'react';

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

// Components
import HeroImage from './HeroImage';
import Grid from './Grid'
import Thumbnail from './Thumbnail';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';

// Custom Hook
import { useHomeFetch } from '../hooks/useHomeFetch';

// Image
import NoImage from '../images/no_image.jpg'

const Home = () => {

  const { state, loading, error, searchTerm, setSearchTerm } = useHomeFetch()

  console.log(state);

  return (
    <>
      {state.results[0] && !searchTerm ? (
        <HeroImage 
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm}/>
      <Grid header={searchTerm ? `Search Result for ${searchTerm}`: 'Popular Movies'}>
        {state.results.map(movie => (
          <Thumbnail                
            key={movie.id}
            clickable //or just clickable={true}. We used clickable since its default value is true
            image={
              movie.poster_path 
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {!loading && state.page < state.total_pages && (
        <Button text='Load More' />
      )}
    </>
  );
}

export default Home;