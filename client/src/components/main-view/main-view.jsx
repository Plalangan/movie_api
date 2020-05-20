

import React from 'react';
import axios from 'axios';
// import Proptypes from 'prop-types';
import './main-view.scss';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import  {DirectorView} from '../director-view/director-view';
import  {GenreView}  from '../genre-view/genre-view';
import  {MovieCard}  from '../movie-card/movie-card';
import  {MovieView}  from '../movie-view/movie-view';
import  {LoginView}  from '../login-view/login-view';
import  {ProfileView} from '../profile-view/profile-view';
import  {RegistrationView} from '../registration-view/registration-view';

export class MainView extends React.Component {

    constructor() {
      super();
  
      this.state = {
        movies: null,
        user: null
        
      
      };
    }
  
 
        
 
      
    componentDidMount() {
      axios.get('https://myflixdb-pl.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    onMovieClick(movie) {
      this.setState({
        selectedMovie: movie
      });
    }

    onGenreClick(genre){
      this.setState({
        selectedGenre: genre
      });
    }
  

      /*
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
      }

      
      getMovies(token){
        axios.get('https://myflixdb-pl.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    };
*/

  
     
     /*
      
    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });
    
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    }
    
    */

   onLoggedIn(user){
    this.setState({
      user
    });
  } 

   render() {
    const { movies, selectedMovie, user, selectedGenre } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    if (this.state === selectedGenre) return <GenreView key={genre._id} genre={genre}/>;

    return (
     <div className="main-view">
      {selectedMovie
         ? <MovieView movie={selectedMovie}/>
         : movies.map(movie => (
           <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
         ))
      }
     </div>
    );
  }
}