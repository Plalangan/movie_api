import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';

function NavBarUser(props){
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand>MyFlix</Navbar.Brand>
        <span>Logged in as:  </span>
        <Nav.Link>
        <button className="btn btn-danger btn-sm">Your Favorites</button>
        </Nav.Link>
        <Nav.Link>
        <button className="btn btn-danger btn-sm">Edit Your Profile</button>
        </Nav.Link>
        <Nav.Link>
        <button className="btn btn-danger btn-sm" onClick={onLoggedOut}>Log Out</button>
        </Nav.Link>
        <Col>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} visible={visible}/>
        </Col>
        </Navbar>
        
    )
}

function NavBarNoUser(props){
    return (
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

    )
}

export function Navbar(props){
    
}