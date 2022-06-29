import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'

export default class DateInputGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form.Group as={Col}  className="mb-3">
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control 
                    id={this.props.id} 
                    type="number"
                    size="sm"
                    value={this.props.value}
                    placeholder="Please enter a value"
                    onChange={(e) => this.props.handleOnChange(e, this.props.field)} 
                    isInvalid={this.props.invalidStatus}/>
                <Form.Control.Feedback type="invalid">{ this.props.invalidMessage }</Form.Control.Feedback>
            </Form.Group>
        );
    }
}