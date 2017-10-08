import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SaveIcon from 'material-ui-icons/Save';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Navigation from './navigation.jsx';
import {
	save,
	editEntityID,
	createEntity
} from '../actions/entities.js';
import {
	fieldChanged
} from '../actions/forms.js';
import FieldList from './field-list.jsx';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		marginTop: -44,
		zIndex: 1400
	},
	paperHeader: {
		padding: theme.spacing.unit * 3,
	},
	paperContent: {
		padding: theme.spacing.unit * 3,
	}
});
class Entity extends Component {
	fieldChanged(event){
		this.props.fieldChanged(
			this.props.edit.id,
			event.target.id,
			event.target.value
		);
	}
	componentDidMount() {
		var entityId = _.get(this, 'props.match.params.id');
		if(entityId !== 'new'){
			this.props.editEntityID(entityId);
		}else {
			this.props.createEntity();
		}
	}
	render() {
		const classes = this.props.classes;
		return (
			<Navigation>
				<Button fab color="accent" aria-label="add" className={classes.button}
					onClick={()=> this.props.save(this.props.edit)}>
					<SaveIcon />
				</Button>
				<Paper>
					<div className={classes.paperHeader}>
						<Typography type="title" color="inherit">
							Create a new Entity
						</Typography>
					</div>
					<Divider/>
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
				</Paper>
			</Navigation>
		);
	}
}

Entity.propTypes = {
	classes: PropTypes.object.isRequired,
	save: PropTypes.func.isRequired,
	name: PropTypes.string,
	fieldChanged: PropTypes.func.isRequired,
	edit: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	editEntityID: PropTypes.func.isRequired,
	createEntity: PropTypes.func.isRequired
};
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Entity));