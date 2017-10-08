import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import PropTypes from 'prop-types';
import AddIcon from 'material-ui-icons/Add';
import FieldTableCell from '../components/field-table-cell.jsx';
import _ from 'lodash';
import {
	fieldChanged
} from '../actions/forms.js';
import {
	createField
} from '../actions/fields.js';
const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		marginTop: -64,
		zIndex: 1400,
		float: 'right'
	},
	emptyText: {
		padding: theme.spacing.unit * 3,
		color: theme.palette.common.minBlack
	}
});

class FieldList extends Component {
	render() {
		const classes = this.props.classes;
		return (
			<div>
				{_.isEmpty(this.props.fields) && 
					<Typography type="body1" className={classes.emptyText}>
						No fields added yet. Start by clicking the plus button in the bottom right.
					</Typography>
				}
				{!_.isEmpty(this.props.fields) &&
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Type</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.fields.map(row => {
							return (
								<TableRow key={row.id}>
									<FieldTableCell
										fieldChanged={this.props.fieldChanged}
										caption='Name'
										field='name'
										row={row}/>
									<FieldTableCell
										fieldChanged={this.props.fieldChanged}
										caption='Type'
										field='type'
										row={row}/>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>}
				<Button fab color="accent" aria-label="add" className={classes.button}
					onClick={() => this.props.createField()}>
					<AddIcon />
				</Button>
			</div>
		);
	}
}

FieldList.propTypes = {
	classes: PropTypes.object.isRequired,
	fields: PropTypes.array.isRequired,
	createField: PropTypes.func.isRequired,
	fieldChanged: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
	return {
		edit: state.entities.edit,
		name: state.entities.edit.name,
		fields: _.values(state.fields.edit)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createField: ()=>{
			dispatch(createField());
		},
		fieldChanged: (id, field, value)=>{
			dispatch(fieldChanged(id, field, value));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FieldList));