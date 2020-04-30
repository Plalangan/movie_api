import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
      <Link to ={`/genres/${movie.Genre.Name}`}>
        <div className="movie-genre">
        <Button variant="link">Genre</Button>
          <span className="value">{movie.Genre.Name}</span>
        </div>
      </Link>
      <Link to ={`/directors/${movie.Director.Name}`}>
        <div className="movie-director">
        <Button variant="link">Director</Button>
          <span className="value">{movie.Director.Name}</span>
        </div>
        </Link>
        </div>

        )};
    };

MovieView.PropTypes = {
  movie: Proptypes.shape({
    Title: Proptypes.string,
    ImagePath: Proptypes.string,
    Description: Proptypes.string,
    Genre: Proptypes.exact({
      _id: Proptypes.string,
      Name: Proptypes.string,
      Description: Proptypes.string
    }),
    Director: Proptypes.shape({
      Name: Proptypes.string
    })
  }).isRequired
};