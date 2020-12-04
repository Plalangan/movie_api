import React, { useState } from 'react';
import axios from 'axios';
import Proptypes from 'prop-types';
import './login-view.scss';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'

/**
 * renders login view
 * @requires react
 * @requires axios 
 * @requires prop-types
 * @requires react-bootstrap
 */

export function LoginView(props) {
    
    //sets username and password to state
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ show, setShow ] = useState(true);
    
    //returns to movies
    const backToMovies = (e) => {
       window.open('/', '_self');
    }

    //handles login
    const handleSubmit = (e) => {
        e.preventDefault();
        // Send a request to the server for authentication 
        axios.post('https://myflixdb-pl.herokuapp.com/login',
        {
            Username: username,
            Password: password
        },
        )
        .then(response =>{
            const data = response.data;
            props.onLoggedIn(data);
            window.open('/client', '_self');
        })
        .catch(e => {
            console.log('No User Found')
        });
    };

    return (

        <div className="background">
        <div className="login">
        <Modal show = {show}
                      backdrop="static">
                      <p></p>
        <Modal.Title className="text-center">Login Form</Modal.Title>
        <form style={{width: '80%', margin: 'auto', marginTop: '2rem'}}>
            <Form.Group controlId="formBasicUsername">
            <Form.Label>
                Username
            </Form.Label>
                <Form.Control type = "text" placeholder="Enter Username" value= {username} required onChange = {e => setUsername(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Please enter correct user name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>
                Password
                </Form.Label>
                <Form.Control type = "password" placeholder="Enter Password" value={password} required onChange={e => setPassword(e.target.value)}/>
                <Form.Control.Feedback type ="invalid">Please enter correct password</Form.Control.Feedback>
            </Form.Group>
            <Row className="justify-content-md-center">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Log In
            </Button>
            </Row>
            <p></p>
            <Row className="justify-content-md-center">Don't have an account yet?</Row>
            <Row className="justify-content-md-center">
            <Button variant="primary" link href="/register">
                Register
            </Button>
            </Row>
            <p></p>
            <Row className="justify-content-md-center">
            <Button variant="primary" link href="/">
                Back To Movies
            </Button>
            </Row>
            <p></p>
        </form>
        </Modal>
        </div>
        </div>
    )
};

LoginView.Proptypes = {
    onLoggedIn: Proptypes.func.isRequired
};
