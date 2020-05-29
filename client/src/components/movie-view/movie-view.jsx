import React from 'react';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  };

  
  


  render() {
    const { movie,  onGenreClick, genre } = this.props;

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
        <Button onClick={() => onGenreClick(genre)} className ="genre-view" >Genre</Button>
          <span className="value">{movie.Genre.Name}</span>
        </div>
     
     
        <div className="movie-director">
        <Button>Director</Button>
          <span className="value">{movie.Director.Name}</span>
        </div>
      
        </div>

        )};
    };


 