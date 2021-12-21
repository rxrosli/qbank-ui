import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import QuestionPanel from "../../container/QuestionPanel";
import React, { useEffect, useState } from "react";
import IQuestion from "../../models/IQuestion";
import {
	authenticated,
	fetchApi,
	FetchApiEvents,
	FetchApiParams,
	refreshToken
} from "../../services/fetch";
import { useRouter } from "next/dist/client/router";

function getQuestionHeading(question: IQuestion): string {
	return `Question / ${question._id}`;
}

export default function updateQuestion() {
	const router = useRouter();
	const { id } = router.query;
	const [isNavActive, setNavActive] = useState(false);
	const [question, setQuestion] = useState<IQuestion>();

	async function updateQuestion(question: IQuestion) {
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
		if (!id) {
			return;
		}
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
				console.log(error.response.data.error.message);
			},
			onTokenExpired: () => refreshToken()
		};
		fetchApi(apiParams, events);
	}, [id]);

	return question ? (
		<div>
			<div className="page row">
				<QuestionPanel
					question={question}
					setQuestion={setQuestion}
					onSaveClick={() => updateQuestion(question)}
				/>
			</div>

			<Header
				heading={getQuestionHeading(question)}
				onMenuClick={() => setNavActive(true)}
			/>
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
		</div>
	) : (
		<div>loading...</div>
	);
}
