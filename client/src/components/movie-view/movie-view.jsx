import React from 'react';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import './movie-view.scss';

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
          <p></p>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
          <p></p>
        </div>
     
        <div className="movie-genre">
          <Link to={`/genres/${movie.Genre.Name}`}></Link>
            <Button className ="genre-view" a href={`/genres/${movie.Genre.Name}`}>Genre</Button>
          <span className="value">-{movie.Genre.Name}</span>
          <p></p>
        </div>
     
    
     
        <div className="movie-director">
        <Button>Director</Button>
          <span className="value">-{movie.Director.Name}</span>
          <p></p>
        </div>
      
        </div>

        )};
    };


 