import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';

/**
 * handles filtering movies
 * @requires react
 * @requires react-bootstrap
 * @requires react-redux
 * @function VisibilityFilterInput
 */

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