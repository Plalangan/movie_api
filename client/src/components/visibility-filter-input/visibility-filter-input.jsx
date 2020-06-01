import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
    return (
    <Form.Control
    onChange={(e) => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder = "Search For Movie By Title.."
    />
    );
}

export default connect(null, { setFilter })(VisibilityFilterInput);