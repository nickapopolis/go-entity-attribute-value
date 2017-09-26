import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import Home from '../components/home.jsx';
import Entity from '../components/entity.jsx';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import primary from 'material-ui/colors/blueGrey';
import cyan from 'material-ui/colors/cyan';
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
		secondary: cyan
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
						</div>
					</MuiThemeProvider>
				</ConnectedRouter>
			</Provider>
		);
	}
}