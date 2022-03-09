import { useEffect } from "react";
import axios, { AxiosResponse, Method } from "axios";
import Router from "next/router";

export type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type FetchApiBody = { [index: string]: any };
export type FetchApiParams = {
	uri: string;
	method: HttpMethods;
	body?: FetchApiBody;
};
export type FetchApiEvents = {
	onLoad?: () => Promise<void>;
	onSuccess?: (data: AxiosResponse<any, any>) => Promise<void>;
	onError?: (error: any) => Promise<void>;
	onTokenExpired?: () => Promise<void>;
};
export async function fetchApi(params: FetchApiParams, events: FetchApiEvents) {
	const { uri, method, body = {} } = params;

	const {
		onLoad = async () => {},
		onSuccess = async () => {},
		onError = async error => {
			console.log(JSON.stringify(error, null, 2));
		},
		onTokenExpired = refreshToken
	} = events;

	const onSuccessHandler = async () => {
		await onSuccess(await axiosHandler(uri, method, body));
	};

	try {
		if (onLoad) await onLoad();
		await onSuccessHandler();
	} catch (error) {
		console.log(error);
		const errors = error.response.data.errors;
		errors.forEach(async (error: any) => {
			if (error === undefined || error.name !== "TokenExpiredError") await onError(error);
		});
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
export function authenticatePageRequest() {
	if (!authenticated()) {
		Router.push("/login");
		return;
	}
}
