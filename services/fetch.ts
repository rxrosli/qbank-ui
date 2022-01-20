import axios, { Method } from "axios";

export type FetchApiEvents = {
	onLoad?: () => Promise<void>;
	onSuccess?: (data: any) => Promise<void>;
	onError?: (error: any) => Promise<void>;
	onTokenExpired?: () => Promise<void>;
};

export type FetchApiBody = { [key: string]: any }; // string | number | null | undefined

export type FetchApiParams = { uri: string } & {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body: FetchApiBody;
};
export async function fetchApi(params: FetchApiParams, fetchApiEvents: FetchApiEvents) {
	const { uri, method, body } = params;
	const { onLoad, onSuccess, onError, onTokenExpired } = fetchApiEvents;

	try {
		if (typeof onLoad === "function") await onLoad();
		const response = await axiosHandler(uri, method, body);
		if (onSuccess) await onSuccess(response);
	} catch (error) {
		if (error.response !== undefined) {
			const message = error.response.data.error.message;
			if (onTokenExpired && message.name === "TokenExpiredError") {
				console.log(message.name);
				try {
					await onTokenExpired();
					const response = await axiosHandler(uri, method, body);
					if (onSuccess) await onSuccess(response);
				} catch (error) {
					if (onError) await onError(error);
				}
			} else {
				if (onError) await onError(error);
			}
		} else {
			if (onError) await onError(error);
		}
	}
}

async function axiosHandler(uri: string, method: Method, body: object) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const authorization = "bearer " + window.localStorage.getItem("token");
	return await axios({
		baseURL: baseUrl,
		url: uri,
		method: method,
		headers: {
			Authorization: authorization
		},
		data: body
	});
}
export function authenticated() {
	const token = window.localStorage.getItem("token");
	const refresh = window.localStorage.getItem("refreshToken");
	if (!token && !refresh) return false;
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
