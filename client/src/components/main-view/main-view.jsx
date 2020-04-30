import React from 'react';
import axios from 'axios';
import Proptypes from 'prop-types';
import './main-view.scss';

import { BrowserRouter as Router, Route } from "react-router-dom";

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
        movies: [],
        user: null
        
      
      };
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

      
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
      }

     /*onLoggedIn(user){
       this.setState({
         user
       });
     } 
     */
      
    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });
    
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    }
    

    render() 
    {
      const { movies, user } = this.state;
      
  
  
    
      if (!movies) return <div className="main-view"/>;
  
      return (
        <Router>
           <div className="main-view">
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
             return movies.map(m => <MovieCard key={m._id} movie={m}/>)}}/>
            <Route path="/register" render={() => <RegistrationView/>}/>
            <Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
            <Route exact path="/genres/:name" render={({match}) => {
              if (!movie) return <div className="main-view"/>;
            <GenreView genre={genres.find(g => g.name === match.params.name)}/>}}/>
            <Route exact path="/directors/:name" render={({match}) => {
              if (!movie) return <div className="main-view"/>;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director
              }/>}}/>
           </div>
        </Router>
      );
    }
  }
