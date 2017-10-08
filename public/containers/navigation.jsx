import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import HomeIcon from 'material-ui-icons/Home';
import { toggleDrawer } from '../actions/navigation.js';
import { fetchEntities } from '../actions/entities.js';

const drawerWidth = 240;
const styles = theme => ({
	flex: {
		flex: 1,
	},
	content: {
		width: '100%',
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: 24,
		height: 'calc(100% - 56px)',
		marginTop: 56
	},
	root: {
		width: '100%',
		zIndex: 1,
		overflow: 'hidden',
	},
	appFrame: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%',
	},
	drawerPaper: {
		background: theme.palette.primary[800],
		position: 'relative',
		height: '100%',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		width: 60,
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	drawerInner: {
		// Make the items inside not wrap when transitioning:
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		background: theme.palette.background.appBar,
		color: theme.palette.common.lightBlack,
		position: 'absolute',
		zIndex: theme.zIndex.navDrawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	listItemText: {
		color: theme.palette.common.darkWhite
	},
	listItemIconShift: {
		marginLeft: 55,
		color: theme.palette.common.darkWhite
	},
	listItemIcon: {
		color: theme.palette.common.darkWhite
	},
	pageTitle: {
		marginLeft: 100
	},
	avatar: {
		width: 30,
		height: 30
	}
});
class Navigation extends Component {
	render() {
		const classes = this.props.classes;
		return (
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar className={classNames(classes.appBar, this.props.open && classes.appBarShift)}>
						<Toolbar disableGutters={!this.props.open}>
							<IconButton className={classNames(classes.menuButton, this.props.open && classes.hide)}
								aria-label="Menu"
								onClick={this.props.drawerOpen}>
								<MenuIcon />
							</IconButton>
							<Typography type="title" color="inherit" className={classNames(classes.flex, classes.pageTitle)}>
								{this.props.title}
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer
						type="permanent"
						classes={{
							paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
						}}
						open={this.props.open}>
						<div className={classes.drawerInner}>
							<div className={classes.drawerHeader}>
								<IconButton onClick={this.props.drawerClose}>
									<ChevronLeftIcon className={classes.listItemIcon} />
								</IconButton>
							</div>
							<Divider />
							<List>
								<ListItem button onClick={()=>this.props.navigateTo('/')}>
									<ListItemIcon>
										<HomeIcon className={classes.listItemIcon} />
									</ListItemIcon>
									<ListItemText classes={{
										text: classes.listItemText
									}} primary="Home" />
								</ListItem>
							</List>
							<Divider />
							<List>{
								this.props.entities.map(entity => {
									return <ListItem button key={entity.id}
										onClick={()=>this.props.navigateTo('/eav/' + entity.id)}>
										{!this.props.open && <ListItemIcon>
											<Avatar aria-label={entity.name} className={classes.avatar}>
												{entity.name.charAt(0).toUpperCase()}
											</Avatar>
										</ListItemIcon>}
										{this.props.open && <ListItemText
											classes={{text: classNames(classes.listitemText, classes.listItemIconShift)}}
											primary={entity.name} 
										/>}
									</ListItem>;
								})}
							</List>
						</div>
					</Drawer>

					<main className={classes.content}>
						{this.props.children}
					</main>
				</div>
			</div>
		);
	}
	componentDidMount() {
		this.props.fetchEntities();
	}
}
Navigation.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	open: PropTypes.bool.isRequired,
	drawerOpen: PropTypes.func.isRequired,
	drawerClose: PropTypes.func.isRequired,
	fetchEntities: PropTypes.func.isRequired,
	title: PropTypes.string,
	entities: PropTypes.array.isRequired,
	navigateTo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		open: state.navigation.drawer.open,
		entities: state.entities.all
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		drawerOpen: () => {
			dispatch(toggleDrawer(true));
		},
		drawerClose: () => {
			dispatch(toggleDrawer(false));
		},
		fetchEntities: () => {
			dispatch(fetchEntities());
		},
		navigateTo: (route) => {
			dispatch(push(route));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navigation));