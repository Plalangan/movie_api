import React, { useState } from 'react';
import './registration-view.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import axios from 'axios';

/**
 * renders user registration view
 * @requires react
 * @requires react-boostrap
 * @requires axios
 * @function RegistrationView
 * @function handleSubmit
 */

export function RegistrationView(props){
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ validated, setValidated ] = useState('false');
    const [ show, setShow ] = useState(true);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, username, password, email, birthday, validated),
        axios.post('https://myflixdb-pl.herokuapp.com/users', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    }).then(response=> {
        const data = response.data;
        console.log(data);
        window.open('/client', '_self');
    }).catch(e => {
        console.log('error registering the user')
    });
    }


return (
    <div class="background" >
        <div></div>
    
    <Modal show={show}
            backdrop="static">
                <p></p>
    <Modal.Title className="text-center">Registration Form </Modal.Title>
    <form style = {{width: '80%', margin: 'auto', marginTop: '2rem'}}>
        <Form.Group controlId="formBasicName">
            <Form.Label>
                Name
            </Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} required onChange = {e => setName(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
            <Form.Label>
                Username
            </Form.Label>
                <Form.Control type="text" placeholder="Create Username" value={username} required onChange = {e => setUsername(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>
                Password
            </Form.Label>
                <Form.Control type="password" placeholder="Create Password" value={password} required onChange = {e => setPassword(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
            <Form.Label>
                E-mail
            </Form.Label>
                <Form.Control type="email" placeholder="Enter your e-mail address" value={email} required onChange = {e => setEmail(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Please enter your e-mail address</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
            <Form.Label>
                Birthdate
            </Form.Label>
                <Form.Control type="date" placeholder="Enter your date of birth" value={birthday} required onChange = {e => setBirthday(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Please enter your date of birth</Form.Control.Feedback>
        </Form.Group>
        <Row className="justify-content-md-center">
        <Button variant = "primary" class="btn" type="submit" onClick={handleSubmit} >
            Create User
        </Button>
        </Row>
        <p></p>
        <Row className="justify-content-md-center">
        Already have an account?
        </Row>
        <Row className="justify-content-md-center">
        <Button variant = "primary" class="btn" link href='/login' >
            Log In
        </Button>
        </Row>
        <p></p>
        
        <Row className="justify-content-md-center">
        <Button variant = "primary" class="btn" link href='/' >
            Back To Movies
        </Button>
        </Row>
        <p></p>
        </form>
        <p></p>
        </Modal>
        </div>
)};