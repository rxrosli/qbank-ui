import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import {
	fetchApi,
	FetchApiEvents,
	FetchApiParams,
	authenticated,
	refreshToken
} from "../services/fetch";

export default function Home() {
	const router = useRouter();
	const [data, setData] = useState({});

	useEffect(() => {
		if (!authenticated()) router.push("/login");
		const apiParams: FetchApiParams = { uri: "/", method: "GET", body: {} };
		const events: FetchApiEvents = {
			onSuccess: async data => setData(data.data.data),
			onError: async error => {
				console.log(error.response.data.error.message.name);
				router.push("/login");
			},
			onTokenExpired: () => refreshToken()
		};
		fetchApi(apiParams, events);
	}, []);

	return <>{JSON.stringify(data)}</>;
}
