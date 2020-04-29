import React, { useState } from 'react';
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
    };

    return (
        <form>
            <Form.Group controlId="formBasicUsername">
            <Form.Label>
                Username
            </Form.Label>
                <Form.Control type = "text" placeholder="Enter Username" value= {username} required onChange = {e => setUsername(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Please Enter Correct User Name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>
                Password
                </Form.Label>.
                <Form.Control type = "password" placeholder="Enter Password" value={password} required onChange={e => setPassword(e.target.value)}/>
                <Form.Control.Feedback type ="invalid">Please Enter Correct Password</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            
        </form>
    )
}