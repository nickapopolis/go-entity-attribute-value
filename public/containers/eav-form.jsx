import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import EAVFormField from '../components/eav-form-field.jsx';
import _ from 'lodash';
import {
	fieldChanged
} from '../actions/forms.js';
import Grid from 'material-ui/Grid';
const styles = theme => ({
	emptyText: {
		padding: theme.spacing.unit * 3,
		color: theme.palette.common.minBlack
	},
	paperContent: {
		padding: theme.spacing.unit * 3
	}
});

class EAVForm extends Component {
	render() {
		const classes = this.props.classes;
		return (
			<div className={classes.paperContent}>
				{_.isEmpty(this.props.fields) &&
					<Typography type="body1" className={classes.emptyText}>
						No fields to configure yet.
					</Typography>
				}
				{!_.isEmpty(this.props.fields) &&
					<Grid container>
						{this.props.fields.map((field) => {
							return <Grid key={field.id} item xs={12}>
								<EAVFormField
									field={field}
									data={this.props.data}
									fieldChanged={this.props.fieldChanged.bind(this)}
								/>
							</Grid>;
						})}
					</Grid>
				}
			</div>
		);
	}
}

EAVForm.propTypes = {
	classes: PropTypes.object.isRequired,
	fields: PropTypes.array.isRequired,
	fieldChanged: PropTypes.func.isRequired,
	data: PropTypes.object
};
const mapStateToProps = (state) => {
	let entityId = state.eav.entity;
	let allFields = _.values(state.fields.all || {});
	let fields = _.filter(allFields, (field) => {
		return field.entityId === entityId;
	});
	return {
		data: state.eav.edit,
		fields,
		entityId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fieldChanged: (id, field, value) => {
			dispatch(fieldChanged(id, field, value));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EAVForm));