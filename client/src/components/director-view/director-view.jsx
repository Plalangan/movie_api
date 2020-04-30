import React from 'react';
import axios from 'axios';
import Proptypes from 'prop-types';

export class DirectorView extends React.Component {
    constructor(){
        super();

        this.state = {};
    }

    render(){
        const { director, movie } = this.props;

        if (!director) return null;

        return (
            <div className="director-view">
            <img className="director-poster" src={movie.Director.ImagePath}/>
            <div className="director-name">
                <span className="label">Name:</span>
                <span className="value">{movie.Director.Name}</span>
            </div>
            <div className="director-bio">
                <span className="label">Bio:</span>
                <span className="value">{movie.Director.Bio}</span>
            </div>
            <div className="director-born">
                <span className="label">Born:</span>
                <span className="value">{movie.Director.Born}</span>
            </div>
            </div>
        )
    }
}