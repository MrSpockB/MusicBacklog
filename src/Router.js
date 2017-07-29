import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import History from './History';
import LoginComponent from './components/Login';
import BacklogComponent from './components/Backlog';

const RouterComponent = () => {
	return (
		<Router history={History}>
			<div>
				<Route exact path="/" component={LoginComponent} />
				<Route path="/backlog" component={BacklogComponent} />
			</div>
		</Router>
	)
};

export default RouterComponent;