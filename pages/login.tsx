import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useEffect, useState } from "react";
import { UserInput } from "../models/User";

export default function Login() {
	const router = useRouter();
	const [userInput, setUserInput] = useState<UserInput>({ username: "", password: "" });
	const [authFailed, setAuthFailed] = useState(false);

	const auth = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL,
		timeout: parseInt(process.env.NEXT_PUBLIC_TIMEOUT || "10000"),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	});

	function handleUsernameChange(username: string) {
		setUserInput({ ...userInput, username: username });
	}

	function handlePasswordChange(password: string) {
		setUserInput({ ...userInput, password: password });
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		await auth({
			method: "POST",
			url: "/auth",
			data: userInput
		})
			.then(res => {
				const data = res.data.data;
				window.localStorage.setItem("token", data.accessToken);
				window.localStorage.setItem("refreshToken", data.refreshToken);
				router.push("/");
			})
			.catch(err => {
				setAuthFailed(true);
				console.log(err);
			});
	}

	return (
		<>
			<body className="auth-body" />
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
					<button className="auth-submit" children="Sign In" type="submit" />
				</div>
			</form>
			{authFailed ? (
				<div className="auth-notif-failed" children="authentication failed." />
			) : null}
		</>
	);
}
