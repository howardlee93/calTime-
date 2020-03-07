// route_api_util.js
import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect, withRouter} from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact}) => (
	<Route path={path} exact={exact} render={(props) =>(
		! loggedIn ? (
			<Component {...props}/>
		) : (
		<Redirect to='/todos'/>
			)
		)}/>
	);


const Protected = ({ component: Component, loggedIn, ...rest}) => (
	<Route 
		{...rest}
		render={props =>
			loggedIn ? (
				<Component {...props}/>
			) : (
				<Redirect to='/login'/>
			)
		}
	/>
 	);

const mapStateToProps = state => ({
	loggedIn: state.session.isAuthenticated
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedAuth = withRouter(connect(mapStateToProps)(Protected));
