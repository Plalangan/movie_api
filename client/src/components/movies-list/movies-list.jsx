import React from 'react';
import { connect } from 'react-redux';
import './movies-list.scss'
import Animated from 'react-css-animated';
import { MovieCard } from '../movie-card/movie-card';
import NaviBar from '../navi-bar/navi-bar';

/**
 * renders movie list
 * @requires react
 * @requires react-redux
 * @requires react-css-animated
 * @requires navi-bar
 * @function mapStateToProps
 * @function MoviesList
 */

const mapStateToProps = state => {
    const { visibilityFilter, visible, user, favorites, favoritemovies, updateFavorites} = state;
    return { visibilityFilter, visible, };
};

function MoviesList(props){
    const { addFavorite, updateFavorites, favoritemovies, movies, visibilityFilter, visible, animate, isFavorite, user, onLoggedOut, toggleModal, onToggleFavorite, token} = props;
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
    {filteredMovies.map(m => <MovieCard key={m._id} movie={m} favoritemovies={favoritemovies} updateFavorites={updateFavorites} isFavorite={isFavorite} onToggleFavorite={movie=>this.onToggleFavorite} user={user}/>)}
    </div> 
    </Animated>
    
    </div>
    )

    if ( user ) return (
            
    <div className ="movies-list">
    
    <NaviBar onLoggedIn={user => this.onLoggedIn(user)} onLoggedOut={onLoggedOut} user={user} toggleModal={toggleModal}/>
    
    <Animated animateOnMount duration={{in:1000}} animationIn="slideInUp" animationOut="slideOutDown" isVisible={animate}>
    <div className='card-deck'>
    {filteredMovies.map(m =>  <MovieCard key={m._id} movie={m} favoritemovies={favoritemovies} isFavorite={isFavorite} updateFavorites={updateFavorites} onToggleFavorite={movie=>this.onToggleFavorite} user={user}/>)}
    </div> 
    </Animated>
    
    </div>
    )

    return (
        <div className ="movies-list">
        <NaviBar onLoggedIn={user => this.onLoggedIn(user)} onLoggedOut={onLoggedOut} user={user} />
        <Animated animateOnMount duration={{in:1000}} animationIn="slideInUp" animationOut="slideOutDown" isVisible={animate}>
        <div className='card-deck'>
        {filteredMovies.map(m => <MovieCard key={m._id} movie={m} isFavorite ={isFavorite} updateFavorites={updateFavorites} addFavorite={addFavorite} onToggleFavorite={onToggleFavorite} user={user} token={token} favoritemovies={favoritemovies}/>)}
        </div> 
        </Animated>
        </div>
    )
    }

export default connect(mapStateToProps)(MoviesList);