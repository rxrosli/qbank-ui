import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from "axios";
import IQuestion from "../models/IQuestion";

export type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type FetchParams = {
	uri: string;
	method: HttpMethods;
	body?: { [index: string]: any };
};

type FindByQuery<T> = (query: Partial<T>) => Promise<any>;
type FindById<T> = (id: string) => Promise<any>;
type Create<T> = (obj: T) => Promise<void>;
type Delete<T> = (id: string) => Promise<void>;
type Update<T> = (id: string, obj: T) => Promise<void>;

type Service<T> = {
	find: FindByQuery<T>;
	findById: FindById<T>;
	create: Create<T>;
	delete: Delete<T>;
	update: Update<T>;
};

const baseURL = process.env.NEXT_PUBLIC_API!;

export const questionApi = useApi<IQuestion>("questions");
export const examApi = useApi<IQuestion>("exams");

export function useApi<T>(name: string): Service<T> {
	return {
		find: async (query: Partial<T>) => {
			return await fetch({ method: "POST", uri: `${baseURL}/${name}/query`, body: query });
		},
		findById: async (id: string) => {
			return await fetch({ method: "GET", uri: `${baseURL}/${name}/${id}` });
		},
		create: async (obj: T) => {
			await fetch({ method: "POST", uri: `${baseURL}/${name}`, body: obj });
		},
		delete: async (id: string) => {
			await fetch({ method: "DELETE", uri: `${baseURL}/${name}/${id}` });
		},
		update: async (id: string) => {
			await fetch({ method: "PUT", uri: `${baseURL}/${name}/${id}` });
		}
	};
}

function createAxiosConfig(
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
	console.info("Refreshing token.");
	await axios(createAxiosConfig("auth", "GET", {}, headers))
		.then(res => {
			window.localStorage.setItem("token", res.data.data.accessToken);
		})
		.catch(err => {
			console.log(err);
		});
}

async function fetch(params: FetchParams) {
	const { uri, method, body = {} } = params;
	const onError = (error: any) => {
		console.log(JSON.stringify(error, null, 2));
	};
	try {
		return await axios(createAxiosConfig(uri, method));
	} catch (error) {
		console.log(error);
		const errors = error.response.data.errors;
		errors.forEach(async (error: any) => {
			if (error === undefined || error.name !== "TokenExpiredError") throw error;
		});
		try {
			await refreshToken();
			return await axios(createAxiosConfig(uri, method, body));
		} catch (error) {
			onError(error);
		}
	}
}
