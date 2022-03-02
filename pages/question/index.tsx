import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Panel from "../../container/question/Panel";
import IQuestion from "../../models/IQuestion";
import {
	authenticated,
	fetchApi,
	FetchApiEvents,
	FetchApiParams,
	refreshToken
} from "../../utility/fetch";

export default function Question() {
	const router = useRouter();
	const { id } = router.query;
	const [isNavActive, setNavActive] = useState(false);
	const [question, setQuestion] = useState<IQuestion>();

	async function handleOnSaveClick(question: IQuestion) {
		const apiParams: FetchApiParams = {
			uri: "/questions/" + id,
			method: "PATCH",
			body: question
		};
		const events: FetchApiEvents = {
			onSuccess: async data => {
				console.log(data.data.data._id);
				return;
			},
			onError: async error => {
				console.log(JSON.stringify(error, null, 2));
			},
			onTokenExpired: () => refreshToken()
		};
		await fetchApi(apiParams, events);
	}

	async function handleOnDeleteClick() {
		const apiParams: FetchApiParams = {
			uri: "/questions/" + id,
			method: "DELETE",
			body: {}
		};
		const events: FetchApiEvents = {
			onError: async error => {
				console.log(JSON.stringify(error, null, 2));
				console.log(error);
			},
			onTokenExpired: () => refreshToken()
		};
		await fetchApi(apiParams, events);
		Router.push("/questions");
	}

	useEffect(() => {
		function handleOnLoad() {
			const apiParams: FetchApiParams = {
				uri: `/questions/${id}`,
				method: "GET",
				body: {}
			};
			const events: FetchApiEvents = {
				onSuccess: async data => {
					setQuestion(data.data.data);
				},
				onError: async error => {
					console.log(error.response?.data?.error?.message);
				},
				onTokenExpired: () => refreshToken()
			};
			fetchApi(apiParams, events);
		}
		if (!authenticated()) {
			Router.push("/login");
			return;
		}
		if (!id) {
			return;
		}
		handleOnLoad();
	}, [id]);

	return question ? (
		<div>
			<div className="page page--row">
				<Panel
					question={question}
					setQuestion={setQuestion}
					onSaveClick={() => handleOnSaveClick(question)}
					onDeleteClick={() => handleOnDeleteClick()}
				/>
			</div>
			<Header
				heading={`Question / ${question._id}`}
				onMenuClick={() => setNavActive(true)}
			/>
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
		</div>
	) : (
		<div>loading...</div>
	);
}
