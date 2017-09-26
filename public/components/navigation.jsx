import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { toggleDrawer } from '../actions/navigation.js';

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
	listItemIcon: {
		color: theme.palette.common.darkWhite
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
							<Typography type="title" color="inherit" className={classes.flex}>
								Home
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
									<ChevronLeftIcon className={classes.listItemIcon}/>
								</IconButton>
							</div>
							<Divider />
							<List>
								<ListItem button>
									<ListItemIcon>
										<HomeIcon className={classes.listItemIcon}/>
									</ListItemIcon>
									<ListItemText classes={{
										text: classes.listItemText
									}} primary="Home" />
								</ListItem>
							</List>
							<Divider />
						</div>
					</Drawer>
					
					<main className={classes.content}>
						{this.props.children}
					</main>
				</div>
			</div>
		);
	}
}
Navigation.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	open: PropTypes.bool.isRequired,
	drawerOpen: PropTypes.func.isRequired,
	drawerClose: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		open: state.navigation.drawer.open
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		drawerOpen: () => {
			dispatch(toggleDrawer(true));
		},
		drawerClose: () => {
			dispatch(toggleDrawer(false));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navigation));