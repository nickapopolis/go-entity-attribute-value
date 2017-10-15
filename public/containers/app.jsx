import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import thunk from 'redux-thunk';
import primary from 'material-ui/colors/blueGrey';
import secondary from 'material-ui/colors/blue';
import createHistory from 'history/createBrowserHistory';
import * as reducers from '../reducers';
import Home from './home.jsx';
import Entity from './entity.jsx';
import EAVList from './eav-list.jsx';
import EAV from './eav.jsx';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
	combineReducers({
		...reducers,
		router: routerReducer
	}),
	applyMiddleware(thunk, middleware)
);

const theme = createMuiTheme({
	palette: {
		primary: primary,
		secondary: secondary
	},
});
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<MuiThemeProvider theme={theme}>
						<div>
							<Route exact path="/" component={Home} />
							<Route path="/entity/:id" component={Entity} />
							<Route exact path="/eav/:entityId" component={EAVList} />
							<Route exact path="/eav/:entityId/:id" component={EAV} />
						</div>
					</MuiThemeProvider>
				</ConnectedRouter>
			</Provider>
		);
	}
}