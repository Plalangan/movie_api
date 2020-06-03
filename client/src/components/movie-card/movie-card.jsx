import axios from 'axios'
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss'
import { MovieView } from '../movie-view/movie-view';

export class MovieCard extends React.Component {


  
  render() {
    const { movie, user, favoritemovies} = this.props;
    var isFavorite = this.props.movie.isFavorite;
  
    
  const onToggleFavorite = (e) => {
    let token = localStorage.getItem('token');
  
    console.log(favoritemovies)
    console.log(token)
    console.log(movie._id);
      
  
      
     /* if(user && movie._id !== favoritemovies.includes(movie._id)) {
        axios.post(`https://myflixdb-pl.herokuapp.com/users/${user}/movies/${movie._id}`, {
         // headers: { Authorization: `Bearer ${token}`}
        })
        .console.log('added to favorites');
        }
      
     
      if(user && movie._id === favoritemovies.includes(movie._id)) {*/
       axios.delete(`https://myflixdb-pl.herokuapp.com/users/${user.Username}/movies/${movie._id}`,{
       // headers: { Authorization: `Bearer ${token}`}
      })
      .console.log('removed from favorites');
    } 
    
  

    


    if (!user) return (

      <Card className ="mb-3 mb-sm-4" class="moviecard" style ={{ minWidth: '15rem', maxWidth: '15rem', minHeight: 'rem'}}>
       <Card.Img class="card-img" variant = "top" src ={movie.ImagePath}/>
        
        <Card.Body>
          <Card.Title className="text-center">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
          <Card.Footer>
          <Link to={`/movies/${movie.Title}`}>
          <Button className="btn-sm">See More about {movie.Title}</Button>
          </Link>
          </Card.Footer>.
         
         
      </Card>
    )

    if (user && movie._id === favoritemovies.includes(movie._id)) return (
      <Card className ="mb-3 mb-sm-4" class="moviecard" style ={{ minWidth: '15rem', maxWidth: '15rem', minHeight: 'rem'}}>
        <span className="liked-button" onClick={onToggleFavorite} ></span><Card.Img class="card-img" variant = "top" src ={movie.ImagePath}/>
        
        <Card.Body>
          <Card.Title className="text-center">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
          <Card.Footer>
          <Link to={`/movies/${movie.Title}`}>
          <Button className="btn-sm">See More about {movie.Title}</Button>
          </Link>
          </Card.Footer>.
         
         
      </Card>

    )

    
    return (


 
      <Card className ="mb-3 mb-sm-4" class="moviecard" style ={{ minWidth: '15rem', maxWidth: '15rem', minHeight: 'rem'}}>
        <span className="like-button" onClick={onToggleFavorite} ></span><Card.Img class="card-img" variant = "top" src ={movie.ImagePath}/>
        
        <Card.Body>
          <Card.Title className="text-center">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
          <Card.Footer>
          <Link to={`/movies/${movie.Title}`}>
          <Button className="btn-sm">See More about {movie.Title}</Button>
          </Link>
          </Card.Footer>.
         
         
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

