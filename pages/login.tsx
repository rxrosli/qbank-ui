import { useRouter } from "next/dist/client/router";
import { FormEvent, useEffect, useState } from "react";
import { UserInput } from "../models/User";
import { fetchApi, FetchApiEvents, FetchApiParams } from "../services/fetch";

export default function Login() {
	const router = useRouter();
	const [userInput, setUserInput] = useState<UserInput>({ username: "", password: "" });
	const [authFailed, setAuthFailed] = useState(false);

	function handleUsernameChange(username: string) {
		setUserInput({ ...userInput, username: username });
	}

	function handlePasswordChange(password: string) {
		setUserInput({ ...userInput, password: password });
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const apiParams: FetchApiParams = { uri: "/auth", method: "POST", body: userInput };
		const events: FetchApiEvents = {
			onSuccess: async data => {
				window.localStorage.setItem("token", data.data.data.accessToken);
				window.localStorage.setItem("refreshToken", data.data.data.refreshToken);
				await router.push("/questions");
				return;
			},
			onError: async error => {
				setAuthFailed(true);
				console.log(error.response.data.error.message);
			}
		};
		fetchApi(apiParams, events);
	}

	return (
		<div className="auth-page">
			<form className="auth-container" onSubmit={handleSubmit}>
				<h1 className="auth-form-header">Sign in to qBank</h1>
				<div className="auth-form-body">
					<label className="auth-label">Username or email address</label>
					<input
						className="auth-input"
						type="text"
						value={userInput.username}
						onChange={e => handleUsernameChange(e.currentTarget.value)}
					/>
					<label className="auth-label">Password</label>
					<input
						className="auth-input"
						type="password"
						value={userInput.password}
						onChange={e => handlePasswordChange(e.currentTarget.value)}
					/>
					<button className="auth-submit" type="submit">
						Sign In
					</button>
				</div>
				{authFailed ? (
					<div className="auth-notif-failed">authentication failed.</div>
				) : null}
			</form>
		</div>
	);
}
