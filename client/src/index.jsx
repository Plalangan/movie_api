import React from 'react';
import ReactDOM from 'react-dom';

import {MainView} from './components/main-view/main-view.jsx';
import {RegistrationView} from './components/registration-view/registration-view';

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';
import { LoginView } from './components/login-view/login-view.jsx';
import { DirectorView } from './components/director-view/director-view.jsx';
import { ProfileView } from './components/profile-view/profile-view.jsx';
import { GenreView } from './components/genre-view/genre-view.jsx';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return <ProfileView/>;
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);