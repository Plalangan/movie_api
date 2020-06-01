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

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';



const mapStateToProps = state => {
    const { visibilityFilter, visible, onLoggedOut, user } = state;
    return { visibilityFilter, visible, onLoggedOut };
};

function MoviesList(props){
    const { movies, visibilityFilter, visible, animate, onLoggedOut, onToggleFavorite, isFavo} = props;
    let filteredMovies = movies;
    
  

    if (visibilityFilter !== ''){
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter));
    }

    if (!movies) return <div className="main-view"/>;

    return( 
    
    <div className ="movies-list">
    
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand>MyFlix</Navbar.Brand>
        <Nav.Link>
            <button className="btn btn-danger btn-sm">Log In</button>
        </Nav.Link>
        <Nav.Link>
            <button className="btn btn-danger btn-sm">Sign Up</button>
        </Nav.Link>
        <Col>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} visible={visible}/>
        </Col>
        </Navbar>
    

    <Animated animateOnMount duration={{in:1000}} animationIn="slideInUp" animationOut="slideOutDown" isVisible={animate}>
    <div className='card-deck'>
    {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
    </div> 
    </Animated>
    
    </div>
    )
}

export default connect(mapStateToProps)(MoviesList);