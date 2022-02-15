import { useEffect } from "react";
import axios, { Method } from "axios";
import Router from "next/router";

export type FetchApiBody = { [key: string]: any };
export type FetchApiParams = {
	uri: string;
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: FetchApiBody;
};
export type FetchApiEvents = {
	onLoad?: () => Promise<void>;
	onSuccess?: (data: any) => Promise<void>;
	onError?: (error: any) => Promise<void>;
	onTokenExpired?: () => Promise<void>;
};
export async function fetchApi(params: FetchApiParams, fetchApiEvents: FetchApiEvents) {
	const { uri, method, body = {} } = params;
	const {
		onLoad = async () => {},
		onSuccess = async () => {},
		onError = async () => {},
		onTokenExpired = refreshToken
	} = fetchApiEvents;
	const onSuccessHandler = async () => {
		await onSuccess(await axiosHandler(uri, method, body));
	};
	try {
		await onLoad();
		await onSuccessHandler();
	} catch (error) {
		if (
			error.response === undefined ||
			error.response.data.error.message.name !== "TokenExpiredError"
		)
			await onError(error);
		try {
			await onTokenExpired();
			await onSuccessHandler();
		} catch (error) {
			await onError(error);
		}
	}
}
async function axiosHandler(uri: string, method: Method, body: object) {
	return await axios({
		baseURL: process.env.NEXT_PUBLIC_API_URL,
		url: uri,
		method: method,
		headers: {
			Authorization: "bearer " + window.localStorage.getItem("token"),
			"Content-Type": "application/json"
		},
		data: body
	});
}
export function authenticated(): boolean {
	const username = window.localStorage.getItem("username");
	const token = window.localStorage.getItem("token");
	const refresh = window.localStorage.getItem("refreshToken");
	if (!username && !token && !refresh) return false;
	return true;
}
export async function refreshToken() {
	const auth = process.env.NEXT_PUBLIC_API_URL + "/auth";
	const refresh = window.localStorage.getItem("refreshToken");
	await axios({
		method: "GET",
		url: auth,
		headers: {
			Accept: "application/json",
			Authorization: "bearer " + refresh
		}
	})
		.then(res => {
			window.localStorage.setItem("token", res.data.data.accessToken);
		})
		.catch(err => {
			console.log(err);
		});
}
export function onPageLoad(onSuccess: () => void) {
	useEffect(() => {
		if (!authenticated()) {
			Router.push("/login");
			return;
		}
		onSuccess();
	});
}
