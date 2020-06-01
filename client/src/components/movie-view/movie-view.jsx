import React from 'react';
import Button from 'react-bootstrap/Button';
import Animated from 'react-css-animated';
import { Link } from 'react-router-dom';
import './movie-view.scss';
import Card from 'react-bootstrap/Card';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  };

  
  


  render() {
    const { movie,  onGenreClick, genre, animate } = this.props;

    if (!movie) return null;

    return (
      
      <Animated className='col-lg-8 mx-auto mt-4' animateOnMount duration={{in:300}} animationIn="slideInUp" animationOut="slideOutDown" isVisible={animate}>
      <div className="movie-view" class="card">
        <img className="movie-poster"src={movie.ImagePath} />
        <Card.Title className="text-center"> 
          <span className="label"></span>
          <span className="value">{movie.Title}</span>
          <p></p><p></p>
        </Card.Title>
        <Card.Text className="text-center">
        <div className="movie-description">
          <span className="label"></span>
          <span className="value">{movie.Description}</span>
          <p></p>
        </div>
     
        <div className="movie-genre">
          <Link to={`/genres/${movie.Genre.Name}`}></Link>
            
          <span className="value">Genre: - {movie.Genre.Name}</span>
          <p></p>
          <Button className ="genre-view" a href={`/movies/genres/${movie.Genre.Name}`}>See more about {movie.Genre.Name}</Button>
        </div>
        <p></p>
     
    
     
        <div className="movie-director">
        <span className="value">Directed by {movie.Director.Name}</span><p></p>
        <Button>See more about {movie.Director.Name}</Button>
          
          <p></p>
        </div>

        
        <p></p><p></p>
        <Link to={`/`}>
        <Button class="btn-sm">Back to movies</Button>
        </Link>
        </Card.Text>
        <p></p>
      
        </div>
        </Animated>

        )};
    };


 