import _ from 'lodash';
import React, { Component } from 'react';
import Navigation from './navigation.jsx';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';
import DescriptionIcon from 'material-ui-icons/Description';
import { push } from 'react-router-redux';
import Card, { CardActions, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
const styles = theme => ({
	card: {
		minWidth: 150,
		minHeight: 100,
		margin: theme.spacing.unit,
	},
	button: {
		margin: theme.spacing.unit,
		marginTop: -44,
		zIndex: 1400
	},
	emptyText: {
		color: theme.palette.common.minBlack
	},
	emptyIcon: {
		height: 200,
		width: 200,
		color: theme.palette.common.minBlack
	},
	emptyContainer: {
		width: '100%',
		textAlign: 'center',
		height: '100%',
		marginTop: 100
	},
	entityCards: {
		display: 'flex'
	},
	pos: {
		marginBottom: 12,
		color: theme.palette.text.secondary,
	},
	avatar: {
		backgroundColor: theme.palette.secondary[200],
	}
});
class Home extends Component {
	render() {
		const classes = this.props.classes;
		return (
			<Navigation>
				<Button fab color="accent" aria-label="add" className={classes.button}
					onClick={() => this.props.navigateTo('/entity/new')}>
					<AddIcon />
				</Button>
				<div className={classes.entityCards}>
					{
						this.props.entities.map((entity) => {
							return <Card className={classes.card} key={entity.ID}>
								<CardHeader
									avatar={
										<Avatar aria-label={entity.name} className={classes.avatar}>
											{entity.name.charAt(0).toUpperCase()}
										</Avatar>
									}
									title={entity.name}
									subheader={(_.get(entity, 'fields.length') || 0) + ' Fields'}
								/>
								<CardActions>
									<Button dense color="primary">
										View records
									</Button>
									<Button><EditIcon/></Button>
								</CardActions>
							</Card>;
						})
					}
				</div>
				{
					this.props.entities.length === 0 && (
						<div className={classes.emptyContainer}>
							<DescriptionIcon className={classes.emptyIcon} />
							<Typography type="title" className={classes.emptyText}>
								No entities added yet.<br />
								Start by clicking the plus button in the top left.
							</Typography>
						</div>
					)
				}
			</Navigation>
		);
	}
}
Home.propTypes = {
	classes: PropTypes.object.isRequired,
	entities: PropTypes.array.isRequired,
	navigateTo: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
	return {
		entities: state.entities.all
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigateTo: function (route) {
			dispatch(push(route));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));