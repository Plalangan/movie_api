import React, { useState } from 'react';
import proptypes from 'prop-types';
import './registration-view.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export function RegistrationView(props){
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ validated, setValidated ] = useState('false');

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
                Birthday
            </Form.Label>
                <Form.Control type="date" placeholder="Enter your date of birth" value={birthday} required onChange = {e => setBirthday(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Please enter your date of birth</Form.Control.Feedback>
        </Form.Group>

        <Button variant = "primary" type="submit" onClick={handleSubmit} >
            Create User
        </Button>
        </form>
)};