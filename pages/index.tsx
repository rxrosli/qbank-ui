import Router from "next/router";
import { useEffect, useState } from "react";
import {
	fetchApi,
	FetchApiEvents,
	FetchApiParams,
	authenticated,
	refreshToken
} from "../services/fetch";

export default function Home() {
	const [data, setData] = useState({});

	async function onLogin() {
		if (!authenticated()) {
			await Router.push("/login");
			return;
		}
		const apiParams: FetchApiParams = { uri: "/", method: "GET", body: {} };
		const events: FetchApiEvents = {
			onSuccess: async data => setData(data.data.data),
			onError: async error => {
				console.log(error.response.data.error.message.name);
				Router.push("/login");
			},
			onTokenExpired: () => refreshToken()
		};
		fetchApi(apiParams, events);
	}

	useEffect(() => {
		onLogin();
	}, []);

	return <>{JSON.stringify(data)}</>;
}
