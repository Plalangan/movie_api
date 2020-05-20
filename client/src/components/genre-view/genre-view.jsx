  
import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import './genre-view.scss';


export const GenreView = (props) => {
  const { genre, movies, user, userProfile, onToggleFavourite, onGenreClick } = props;
  if (!genre) return null;
  return (
    <div className="genre-view">
      <h1>{genre.Name}</h1>
      <br />
      <Media className="d-flex flex-column flex-md-row align-items-center">
        <Media.Body>
          <h5>Description</h5>
          <p>{genre.Description}</p>
        </Media.Body>
      </Media>
      <br />
      <MoviesGrid 
        movies={movies}
        title="Some movies that belong to this Genre"
        onToggleFavourite={movieId => onToggleFavourite(movieId)}
        user={user}
        userProfile={userProfile}
      />
    </div>
  );
}