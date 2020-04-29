import React from 'react';
import Proptypes from 'prop-types';

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

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
       </div>


    );
  }
};

MovieView.Proptypes = {
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
}