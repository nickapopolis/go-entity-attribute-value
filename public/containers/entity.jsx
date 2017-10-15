import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import {
	save,
	editEntityID,
	createEntity
} from '../actions/entities.js';
import {
	fieldChanged
} from '../actions/forms.js';
import FieldList from './field-list.jsx';
import Form from '../components/form.jsx';

const styles = theme => ({
	paperHeader: {
		padding: theme.spacing.unit * 3,
	},
	paperContent: {
		padding: theme.spacing.unit * 3,
	}
});

const mapStateToProps = (state) => {
	return {
		edit: state.entities.edit,
		name: state.entities.edit.name
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fieldChanged: (id, field, value)=>{
			dispatch(fieldChanged(id, field, value));
		},
		save: (entity)=>{
			dispatch(save(entity));
		},
		editEntityID: (id) =>{
			dispatch(editEntityID(id));
		},
		createEntity: ()=>{
			dispatch(createEntity());
		}
	};
};
class Entity extends Component {
	fieldChanged(event){
		this.props.fieldChanged(
			this.props.edit.id,
			event.target.id,
			event.target.value
		);
	}
	render() {
		const classes = this.props.classes;
		return (
			<Form
				title="Create a new Entity"
				edit={this.props.editEntityID.bind(this)}
				create={this.props.createEntity.bind(this)}
				save={this.props.save.bind(this)}
				match={this.props.match}
				content={
					<div>
						<div className={classes.paperContent}>
							<TextField 
								id="name"
								label="Entity Name"
								margin="normal"
								value={this.props.name}
								onChange={this.fieldChanged.bind(this)}
								required={true}>
							</TextField>
						</div>
						<Divider/>
						<div className={classes.paperHeader}>
							<Typography type="title" color="inherit">
								Fields
							</Typography>
						</div>
						<FieldList/>
					</div>
				}
			/>
		);
	}
}

Entity.propTypes = {
	classes: PropTypes.object.isRequired,
	save: PropTypes.func.isRequired,
	name: PropTypes.string,
	fieldChanged: PropTypes.func.isRequired,
	edit: PropTypes.object.isRequired,
	editEntityID: PropTypes.func.isRequired,
	createEntity: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Entity));