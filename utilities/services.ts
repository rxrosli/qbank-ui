import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from "axios";
import { PaginationSettings } from "./pagination";

export type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type FetchParams = {
	uri: string;
	method: HttpMethods;
	body?: { [index: string]: any };
};

type FindByQuery<T> = (query: Partial<T>, pagination?: PaginationSettings) => Promise<any>;
type FindById = (id: string) => Promise<any>;
type Create<T> = (obj: T) => Promise<any>;
type Update<T> = (id: string, obj: T) => Promise<void>;
type Delete = (id: string) => Promise<void>;

type Service<T> = {
	find: FindByQuery<T>;
	findById: FindById;
	create: Create<T>;
	update: Update<T>;
	delete: Delete;
};

const baseURL = process.env.NEXT_PUBLIC_API!;

export function useApi<T>(node: string): Service<T> {
	return {
		find: async (query, pagination) => {
			const baseUri = `${baseURL}/${node}/search`;
			if (!pagination) return await fetch({ method: "POST", uri: baseUri, body: query });
			const queryStringParams = `?size=${pagination.size}&page=${pagination.page}`;
			return await fetch({ method: "POST", uri: `${baseUri}${queryStringParams}`, body: query });
		},
		findById: async id => {
			return await fetch({ method: "GET", uri: `${baseURL}/${node}/${id}` });
		},
		create: async obj => {
			return await fetch({ method: "POST", uri: `${baseURL}/${node}`, body: obj });
		},
		update: async (id, obj) => {
			await fetch({ method: "PATCH", uri: `${baseURL}/${node}/${id}`, body: obj });
		},
		delete: async id => {
			await fetch({ method: "DELETE", uri: `${baseURL}/${node}/${id}` });
		}
	};
}

export function geteAxiosConfig(
	uri: string,
	method: Method,
	body?: { [index: string]: any },
	headers?: AxiosRequestHeaders
): AxiosRequestConfig<any> {
	const baseHeaders = {
		Authorization: "bearer " + window.localStorage.getItem("token"),
		"Content-Type": "application/json"
	};
	return {
		baseURL: baseURL,
		url: uri,
		method: method,
		headers: headers ?? baseHeaders,
		data: body ?? null
	};
}

async function refreshToken() {
	const headers = {
		Authorization: "bearer " + window.localStorage.getItem("refreshToken"),
		"Content-Type": "application/json"
	};
	let accessToken: string = "";
	console.info("Refreshing token...");
	axios(geteAxiosConfig("auth", "GET", {}, headers))
		.then(res => {
			window.localStorage.setItem("token", res.data.data.accessToken);
			accessToken = res.data.data.accessToken as string;
		})
		.catch(err => {
			console.log(err);
		});
	return accessToken;
}

export async function fetch(params: FetchParams) {
	const { uri, method, body = {} } = params;
	const onError = (error: any) => {
		console.error(error);
	};
	try {
		return await axios(geteAxiosConfig(uri, method, body));
	} catch (error) {
		if (error.response === undefined) throw error;
		const errors = error.response.data.errors;
		if (errors === undefined) throw error;
		errors.forEach(async (error: any) => {
			if (error === undefined || error.name !== "TokenExpiredError") throw error;
		});
		try {
			const token = await refreshToken();
			console.log(token);
			const headers = {
				Authorization: "bearer " + token,
				"Content-Type": "application/json"
			};
			return await axios(geteAxiosConfig(uri, method, body, headers));
		} catch (error) {
			onError(error);
			return;
		}
	}
}

export function authenticated(): boolean {
	const username = window.localStorage.getItem("username");
	const token = window.localStorage.getItem("token");
	const refresh = window.localStorage.getItem("refreshToken");
	if (!username && !token && !refresh) return false;
	return true;
}
