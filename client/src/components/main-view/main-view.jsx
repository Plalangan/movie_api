import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import  {GenreView}  from '../genre-view/genre-view';
import  {MovieView}  from '../movie-view/movie-view';
import  {LoginView}  from '../login-view/login-view';
import  {RegistrationView} from '../registration-view/registration-view';

/**
 * renders the main view
 * @requires react
 * @requires axios
 * @requires react-redux
 * @requires react-router-dom
 * @function getMovies
 * @function onLoggedIn
 * @function onLoggedOut
 */

class MainView extends React.Component {

  constructor() {
    super();
       this.state = {
       user: null,
       showModal: false,
       favoritemovies: []
      };
    }
    
  componentDidMount() {
    
    //retrieves movies from api then stores them in local storage for offline use
    this.getMovies();
    let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user'),
            favoritemovies : localStorage.getItem('favorites')
          });
          this.getMovies(accessToken);
        }
        };

    /**
     * retrieves movies from api then sets them to props
     * @function getMovies
     */

    getMovies(token){
        axios.get('https://myflixdb-pl.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
      .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
      })
      .catch(function (error) {
      console.log(error);
      });
      };

    /**
     * sets user to state and saves it to local storage
     * @function onLoggedIn
     */

    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username,
        favoritemovies: authData.user.FavoriteMovies
      });
     
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      localStorage.setItem('favorites', authData.user.FavoriteMovies);
      this.getMovies(authData.token);
    }

    /**
     * logs user out
     * @function onLoggedOut
     */

    onLoggedOut(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.open('/', '_self')
      this.setState({
        favoritemovies: []
      })
      }

  render() {
    let { movies, onLoggedOut, token, check} = this.props;
    let { user, showModal} = this.state;
    if (showModal === true) return <LoginView/>
    return (
      <Router basename="/client">
        <div className="main-view">
      <Route exact path ="/" render={() => {
         return <MoviesList  movies = {movies} user={user} onLoggedOut={this.onLoggedOut} onLoggedIn={user => this.onLoggedIn(user)} toggleModal={this.toggleModal}   token={token}  check={check}/>;
      }}/>
      <Route path ="/login" render={() => <LoginView movies = {movies}  user = {user} onLoggedIn={user => this.onLoggedIn(user)} />} />
      <Route path ="/register" render={() => <RegistrationView/>} />
      <Route path ="/movies/:Title" render={({match}) => <MovieView movie={movies.find(m => m.Title === match.params.Title)}/>}/>
      <Route path="/movies/genres/:Name" render ={({match})=> <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre }/>}/>
      </div>
      </Router>
      );
      }
      }
    
    //map movies to props
    let mapStateToProps = state => {
     return { movies: state.movies,
              user: state.user,
            }
    }

  export default connect(mapStateToProps, {setMovies})(MainView)