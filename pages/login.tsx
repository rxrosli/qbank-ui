import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useState } from "react";
import { UserInput } from "../models/User";
import { geteAxiosConfig } from "../utilities/services";

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
		axios(geteAxiosConfig("auth", "POST", userInput))
			.then(async res => {
				window.localStorage.setItem("username", userInput.username);
				window.localStorage.setItem("token", res.data.data.accessToken);
				window.localStorage.setItem("refreshToken", res.data.data.refreshToken);
				await router.push("/questions?page=1");
			})
			.catch(err => {
				setAuthFailed(true);
				console.log(err);
			});
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
				{authFailed ? <div className="auth-notif-failed">authentication failed.</div> : null}
			</form>
		</div>
	);
}
