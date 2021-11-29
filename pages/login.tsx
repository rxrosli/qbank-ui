import React from "react";

export default function login() {
	return (
		<>
			<body className="auth-body" />
			<div className="auth-container">
				<h1 className="auth-form-header">Sign in to qBank</h1>
				<div className="auth-form-body">
					<label className="auth-label">Username or email address</label>
					<input className="auth-input" type="text" />
					<label className="auth-label">Password</label>
					<input className="auth-input" type="password" />
					<button className="auth-submit" children="Sign In" />
				</div>
			</div>
		</>
	);
}
