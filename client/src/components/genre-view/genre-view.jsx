  
import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';


export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, genre } = this.props;

    if (!genre) return null;

    return (
      <div>
        <Container>
          <Card style={{ width: '32rem' }}>
            <Card.Body>
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>Description: {genre.Description}</Card.Text>
              <Link to={`/`}>
                <Button variant="link">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}