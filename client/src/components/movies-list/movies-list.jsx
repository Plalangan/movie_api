import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './movies-list.scss'
import Animated from 'react-css-animated';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import NaviBar from '../navi-bar/navi-bar';



const mapStateToProps = state => {
    const { visibilityFilter, visible} = state;
    return { visibilityFilter, visible};
};

function MoviesList(props){
    const { movies, visibilityFilter, visible, animate, isFavorite, user, onLoggedOut, toggleModal, onToggleFavorite} = props;
    let filteredMovies = movies;
    
    
  

    if (visibilityFilter !== ''){
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view"/>;

    
    if (!user) return( 
    
    <div className ="movies-list">
    
    <NaviBar onLoggedIn={user => this.onLoggedIn(user)} onLoggedOut={onLoggedOut} user={user} toggleModal={toggleModal}/>
    

    <Animated animateOnMount duration={{in:1000}} animationIn="slideInUp" animationOut="slideOutDown" isVisible={animate}>
    <div className='card-deck'>
    {filteredMovies.map(m => <MovieCard key={m._id} movie={m} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} user={user}/>)}
    </div> 
    </Animated>
    
    </div>
    )

    return (
        <div className ="movies-list">
    
        <NaviBar onLoggedIn={user => this.onLoggedIn(user)} onLoggedOut={onLoggedOut} user={user} />
        
    
        <Animated animateOnMount duration={{in:1000}} animationIn="slideInUp" animationOut="slideOutDown" isVisible={animate}>
        <div className='card-deck'>
        {filteredMovies.map(m => <MovieCard key={m._id} movie={m} isFavorite ={isFavorite} onToggleFavorite={movie => this.onToggleFavorite(movie)} user={user}/>)}
        </div> 
        </Animated>
        
        </div>
    )
}

export default connect(mapStateToProps)(MoviesList);