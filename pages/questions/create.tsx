import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Panel from "../../container/question/Panel";
import React, { useEffect, useState } from "react";
import IQuestion from "../../models/IQuestion";
import {
	authenticated,
	fetchApi,
	FetchApiEvents,
	FetchApiParams,
	refreshToken
} from "../../services/fetch";
import router from "next/dist/client/router";

function getQuestionHeading(question: IQuestion): string {
	return `Question / Create`;
}

export default function CreateQuestion() {
	const [isNavActive, setNavActive] = useState(false);
	const [question, setQuestion] = useState<IQuestion>({
		type: "Multiple Choice",
		stem: "",
		options: [],
		tags: []
	});

	async function pushQuestion(question: IQuestion) {
		const apiParams: FetchApiParams = {
			uri: "/questions",
			method: "POST",
			body: question
		};
		const events: FetchApiEvents = {
			onSuccess: async data => {
				console.log(data.data.data._id);
				router.push("/question?id=" + data.data.data._id);
				return;
			},
			onError: async error => {
				console.log(error.response.data.error.message);
			},
			onTokenExpired: () => refreshToken()
		};
		await fetchApi(apiParams, events);
	}

	useEffect(() => {
		if (!authenticated()) {
			router.push("/login");
			return;
		}
	}, []);

	return (
		<div>
			<div className="page page--row">
				{/* TODO add empty fields validation */}
				<Panel
					question={question}
					setQuestion={setQuestion}
					onSaveClick={() => pushQuestion(question)}
				/>
			</div>

			<Header
				heading={getQuestionHeading(question)}
				onMenuClick={() => setNavActive(true)}
			/>
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
		</div>
	);
}
