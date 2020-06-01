import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss'
import { MovieView } from '../movie-view/movie-view';

export class MovieCard extends React.Component {
  render() {
    const { movie, userProfile, isFavorite, onToggleFavorite } = this.props;

    return (


 
      <Card className ="mb-3 mb-sm-4" style ={{ minWidth: '15rem', maxWidth: '15rem', minHeight: 'rem'}}>
        <span className="like-button"><Card.Img class="card-img" variant = "top" src ={movie.ImagePath}/></span>
        
        <Card.Body>
          <Card.Title className="text-center">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          
          <Link to={`/movies/${movie.Title}`}>
          <Button className="btn-sm">See More about {movie.Title}</Button>
          </Link>
         </Card.Body>
         
      </Card>
    );
}
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func
};

