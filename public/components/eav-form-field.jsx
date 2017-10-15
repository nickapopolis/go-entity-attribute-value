import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
export default class EAVFormField extends Component {
	fieldChanged(event){
		this.props.fieldChanged(
			this.props.data.id,
			event.target.id,
			event.target.value
		);
	}
	render() {
		return (
			<TextField
				margin="normal"
				id={this.props.field.id}
				label={this.props.field.name}
				value={this.props.data[this.props.field.id]}
				onChange={this.fieldChanged.bind(this)}/>
		);
	}
}
EAVFormField.propTypes = {
	fieldChanged: PropTypes.func.isRequired,
	data: PropTypes.object,
	field: PropTypes.object.isRequired
};
