import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Navigation from './navigation.jsx';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import {setEntityDataTypeID} from '../actions/eav';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { push } from 'react-router-redux';

const styles = theme => ({
	paper: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto'
	},
	paperHeader: {
		padding: theme.spacing.unit * 3,
	},
	button: {
		margin: theme.spacing.unit,
		marginTop: -44,
		zIndex: 1400
	},
});
class EAVList extends Component {
	componentDidMount() {
		var entityId = _.get(this, 'props.match.params.entityId');
		if(entityId){
			this.props.setEntityDataTypeID(entityId);
		}
	}
	render() {
		const classes = this.props.classes;
		return (
			<Navigation>
				<Button fab color="accent" aria-label="add" className={classes.button}
					onClick={() => this.props.navigateTo('/eav/' + _.get(this, 'props.entity.id') + '/new' )}>
					<AddIcon />
				</Button>
				<Paper className={classes.paper}>
					<div className={classes.paperHeader}>
						<Typography type="title">{_.get(this, 'props.entity.name')}</Typography>
					</div>
					<Table>
						<TableHead>
							<TableRow>
								{_.map(this.props.fields, (field)=>{
									return <TableCell key={field.id}>{field.name}</TableCell>;
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.rows.map(row => {
								return (
									<TableRow key={row.id}>
										{_.map(_.get(this.props.fields), (field)=>{
											return <TableCell>{row[field.name]}</TableCell>;
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Paper>
			</Navigation>
		);
	}
}

EAVList.propTypes = {
	classes: PropTypes.object.isRequired,
	rows: PropTypes.array.isRequired,
	entity: PropTypes.object,
	fields: PropTypes.array,
	setEntityDataTypeID: PropTypes.func.isRequired,
	navigateTo: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
	let entity = _.find(state.entities.all, {
		id: state.eav.entity
	}) || {};
	let fields = _.isEmpty(entity.fields)
		? []
		: _.map(entity.fields, (field)=>{
			return state.fields.all[field];
		});
	return {
		rows: state.eav.rows,
		entity,
		fields
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setEntityDataTypeID: function(entityId){
			dispatch(setEntityDataTypeID(entityId));
		},
		navigateTo: function (route) {
			dispatch(push(route));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EAVList));