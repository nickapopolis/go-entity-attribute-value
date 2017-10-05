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
							<Route path="/entity/new" component={Entity} />
							<Route path="/entity/:id" component={Entity} />
							<Route path="/eav/:entityId" component={EAV} />
						</div>
					</MuiThemeProvider>
				</ConnectedRouter>
			</Provider>
		);
	}
}