import _ from 'lodash';
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import SaveIcon from 'material-ui-icons/Save';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Navigation from '../containers/navigation.jsx';

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
class Form extends Component {
	componentDidMount() {
		var id = _.get(this, 'props.match.params.id');
		if (id !== 'new') {
			this.props.edit(id);
		} else {
			this.props.create();
		}
	}
	render() {
		const classes = this.props.classes;
		return (
			<Navigation>
				<Button fab color="accent" aria-label="add" className={classes.button}
					onClick={() => this.props.save()}>
					<SaveIcon />
				</Button>
				<Paper>
					<div className={classes.paperHeader}>
						<Typography type="title" color="inherit">
							{this.props.title}
						</Typography>
					</div>
					<Divider />
					{this.props.content}
				</Paper>
			</Navigation>
		);
	}
}

Form.propTypes = {
	classes: PropTypes.object.isRequired,
	save: PropTypes.func.isRequired,
	edit: PropTypes.func.isRequired,
	create: PropTypes.func.isRequired,
	content: PropTypes.element.isRequired,
	title: PropTypes.string,
	match: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);