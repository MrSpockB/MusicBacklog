import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginComponent extends Component {

	onEmailChange = (e) => {
		this.props.emailChanged(e.target.value);
    }
    onPasswordChange = (e) => {
        this.props.passwordChanged(e.target.value);
    }
    onLoginButtonPress = () => {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }
	render() {
		return (
			<div className="container">
				<TextField
				    hintText="Email"
				    value={this.props.email}
				    onChange={this.onEmailChange}
				/>
				<br/>
				<TextField
					hintText="Password"
				    type="password"
				    value={this.props.password}
				    onChange={this.onPasswordChange}
				/>
				<br/>
				<RaisedButton
					label="Login"
					primary={true}
					style={{ margin: 12 }}
					onClick={this.onLoginButtonPress}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { email, password, error, loading } = state.auth;
	return { email, password, error, loading };
}

export default withRouter(connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginComponent));