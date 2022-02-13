import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Articles from "../../container/question/Articles";
import Dropdown from "../../components/Dropdown";
import IQuestion from "../../models/IQuestion";
import React, { useEffect, useState } from "react";
import {
	authenticated,
	fetchApi,
	FetchApiEvents,
	FetchApiParams,
	refreshToken
} from "../../services/fetch";
import Router from "next/router";

type SearchQuery = {
	target: string;
	query: string;
};

export default function Questions() {
	const [isActive, setActive] = useState<boolean>(false);
	const searchOptions = ["tag", "question", "id"];
	const [questions, setQuestions] = useState<IQuestion[]>([]);
	const [searchQuery, setSearchQuery] = useState<SearchQuery>({
		target: "tag",
		query: ""
	});

	useEffect(() => {
		if (!authenticated()) {
			Router.push("/login");
			return;
		}
		const apiParams: FetchApiParams = { uri: "/questions", method: "GET", body: {} };
		const events: FetchApiEvents = {
			onSuccess: async data => {
				setQuestions(data.data.data);
			},
			onError: async error => {
				// console.log(error.response.data.error.message.name);
				console.log(error);
				Router.push("/login");
			},
			onTokenExpired: () => refreshToken()
		};
		fetchApi(apiParams, events);
	}, []);
	return (
		<div>
			<div className="page">
				{/* <div className="question-search"> */}
				{/* TODO: add dropdown icon later */}
				{/* <Icon type="caret_down" /> */}
				{/* <Dropdown
						options={searchOptions}
						onChange={e =>
							setSearchQuery({ ...searchQuery, target: e.currentTarget.value })
						}
					/>
					<input />
					<button /> */}
				{/* </div> */}
				<section className="section section--column">
					<Articles questions={questions} />
				</section>
			</div>
			<Header heading="Questions" onMenuClick={() => setActive(true)} />
			<Navigation isActive={isActive} onCollapseClick={() => setActive(false)} />
		</div>
	);
}
