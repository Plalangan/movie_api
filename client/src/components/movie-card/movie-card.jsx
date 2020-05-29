import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card onClick={() => onClick(movie)} className ="movie-card" style ={{ width: '50rem'}}>
        <Card.Img variant = "top" src ={movie.imgPath}/>
        <Card.Body>
          <Card.Title >{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
         
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
  onClick: PropTypes.func.isRequired
};

