import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	save,
	editID,
	create,
	setEntityDataTypeID
} from '../actions/eav.js';
import EAVForm from './eav-form.jsx';
import Form from '../components/form.jsx';

class EAV extends Component {
	componentWillMount(){
		var entityId = _.get(this, 'props.match.params.entityId');
		if(entityId){
			this.props.setEntityDataTypeID(entityId);
		}
	}
	render() {
		return (
			<Form 
				save={this.props.save.bind(this)}
				edit={this.props.edit.bind(this)}
				create={this.props.create.bind(this)}
				title={this.props.entity.name}
				match={this.props.match}
				content={<EAVForm />
				}
			/>
		);
	}
}

EAV.propTypes = {
	save: PropTypes.func.isRequired,
	name: PropTypes.string,
	data: PropTypes.object,
	edit: PropTypes.func.isRequired,
	create: PropTypes.func.isRequired,
	setEntityDataTypeID: PropTypes.func.isRequired,
	entity: PropTypes.object,
	match: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
	let entity = _.find(state.entities.all, {
		id: state.eav.entity
	}) || {};
	return {
		data: state.eav.edit,
		entity
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		save: () => {
			dispatch(save());
		},
		edit: (id) => {
			dispatch(editID(id));
		},
		create: () => {
			dispatch(create());
		},
		setEntityDataTypeID: (entityId) => {
			dispatch(setEntityDataTypeID(entityId));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(EAV);