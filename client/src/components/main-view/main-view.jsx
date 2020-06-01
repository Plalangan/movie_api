

import React from 'react';
import axios from 'axios';
// import Proptypes from 'prop-types';
import './main-view.scss';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import  {DirectorView} from '../director-view/director-view';
import  {GenreView}  from '../genre-view/genre-view';
import  {MovieCard}  from '../movie-card/movie-card';
import  {MovieView}  from '../movie-view/movie-view';
import  {LoginView}  from '../login-view/login-view';
import  {ProfileView} from '../profile-view/profile-view';
import  {RegistrationView} from '../registration-view/registration-view';

class MainView extends React.Component {

    constructor() {
      super();
  
      this.state = {
       //user: null
      };
    }
    
    componentDidMount() {

    this.getMovies();
    let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }};
      
    getMovies(){
        axios.get('https://myflixdb-pl.herokuapp.com/movies', {
          
        })
      .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
      })
      .catch(function (error) {
      console.log(error);
      });
      };


      onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });
    
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    }


    onLoggedOut(){
      console.log('yo');
      this.props.setUser({});
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      }
      
      
    
    


   render() {
    let { movies,onLoggedOut } = this.props;
    let { user } = this.state;

    return (

    
    
    <Router basename="/client">
     <div className="main-view">
     <Route exact path ="/" render={() => {
      
       return <MoviesList movies = {movies}/>;
     }}/>
     <Route path ="/login" render={() => <LoginView onLoggedIn={user => this.onLoggedIn(user)} />}/>
   <Route path ="/register" render={() => <RegistrationView />} />
     <Route path ="/register" render={() => <RegistrationView />} />
     <Route path ="/movies/:Title" render={({match}) => <MovieView movie={movies.find(m => m.Title === match.params.Title)}/>}/>
     <Route path="/movies/genres/:Name" render ={({match})=> <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre }/>}/>
     </div>
     </Router>
    );
   }
  }

  let mapStateToProps = state => {
    return { movies: state.movies,
             //user: state.user
            }
  }

  export default connect(mapStateToProps, {setMovies})(MainView)