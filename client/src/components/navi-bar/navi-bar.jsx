import React from 'react';
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import './navi-bar.scss';
import Proptypes from 'prop-types';

/**
 * renders navigation bar
 * @requires react
 * @requires react-bootstrap
 * @requires react-router-dom
 * @requires react-redux
 * @requires prop-types
 * @function mapStateToProps
 * @function NaviBar
 */

const mapStateToProps = state => {
    const { visibilityFilter, visible, user} = state;
    return { visibilityFilter, visible };
    
};

function NaviBar(props){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const { visibilityFilter , visible, user, onLoggedOut, toggleModal, onLoggedIn} = props;

    if (!user) return( 
        <div className ="navi-bar">
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand>MyFlix</Navbar.Brand>
            <Link to={'/login'}>
                <Button className="btn btn-sm" class="headerButtons" >Log In</Button>
            </Link>
            <span></span>
            <Link to={'/register'}>
            <Button className="btn btn-sm" class="headerButtons">Sign Up</Button>
            </Link>
            <Col xl={{ span: 2, offset: 8}} lg ={{ span: 2, offset: 9}} md={{ span: 2, offset: 9}} sm={{ span: 2, offset: 9}} xs={{ span: 2, offset: 7}}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} visible={visible}/>
            </Col>
            </Navbar>
       </div>
     )

    if (user)  return (
        <div className ="navi-bar">
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand>MyFlix</Navbar.Brand>
            <Badge variant="primary"> Logged in as {user} </Badge>
            <Link to={'/login'}>
                <Button className="btn btn-sm" class="headerButtons">Your Favorites</Button>
            </Link>
            <span></span>
            <Link to={'/register'}>
            <Button className="btn btn-sm" class="headerButtons">Edit Your Profile</Button>
            </Link>
            <Button className="btn btn-sm" class="headerButtons" onClick={onLoggedOut}> Log Out</Button>
            <Col xl ={{ span: 2, offset: 6}} lg ={{ span: 2, offset: 6}} md={{ span: 2, offset: 6}} sm={{ span: 4, offset: 0}}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} visible={visible}/>
            </Col>
            </Navbar>
        </div>
    )}
    NaviBar.Proptypes = {
        onLoggedOut: Proptypes.func.isRequired
    };

    export default connect(mapStateToProps)(NaviBar);