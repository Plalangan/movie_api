import React, { useState } from 'react';
import Proptypes from 'prop-types';
import './login-view.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication 
        // then call props.onLoggedIn (username)
        props.onLoggedIn(username);
    }
    
    const registerSubmit = (e) =>{
        e.preventDefault();
        props.onNewUserRegister(true);
    }

   

    
    ;

    return (
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
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Log In
            </Button>
            <p></p>
            <Button variant="primary" type="submit" onClick={registerSubmit} >
                Register
            </Button>
            
        </form>
    )
};

LoginView.Proptypes = {
    onLoggedIn: Proptypes.func.isRequired
};