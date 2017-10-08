import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { TableCell } from 'material-ui/Table';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const styles = theme => ({
});

class FieldTableCell extends Component {
	fieldChanged(event) {
		this.props.fieldChanged(this.props.row.id, this.props.field, event.target.value);
	}
	render() {
		return <TableCell>
			<TextField
				placeholder={this.props.caption}
				value={this.props.row[this.props.field]}
				onChange={this.fieldChanged.bind(this)} />
		</TableCell>;
	}
}
FieldTableCell.propTypes = {
	classes: PropTypes.object.isRequired,
	fieldChanged: PropTypes.func.isRequired,
	caption: PropTypes.string.isRequired,
	field: PropTypes.string.isRequired,
	row: PropTypes.object.isRequired
};

export default withStyles(styles)(FieldTableCell);