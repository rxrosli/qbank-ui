import router from "next/router";
import React, { useEffect, useReducer } from "react";
import Article from "../../components/exam/Article";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import IExam from "../../models/IExam";
import { authenticatePageRequest, fetchApi, FetchApiEvents } from "../../utility/fetch";

type State = {
	exams: IExam[];
	navigation: boolean;
};
type Action = {
	value?: any;
	type: "toggle-navigation" | "set-exams";
};
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "toggle-navigation":
			return { ...state, navigation: !state.navigation };
		case "set-exams":
			return { ...state, exams: action.value };
		default:
			throw new Error();
	}
};
const initState: State = {
	exams: [],
	navigation: false
};

const Exams = () => {
	const [state, dispatch] = useReducer(reducer, initState);
	const events: FetchApiEvents = {
		onSuccess: async data => {
			dispatch({ type: "set-exams", value: data.data.data });
		}
	};
	useEffect(() => {
		if (!router.isReady) return;
		authenticatePageRequest();
		fetchApi({ uri: "/exams/query", method: "POST" }, events);
	}, []);

	return (
		<>
			<div className="page">
				<section className="section section--column">
					{state.exams.map(exam => (
						<Article key={exam._id} exam={exam} />
					))}
				</section>
			</div>
			<Header
				heading="Exams"
				onMenuClick={() => dispatch({ type: "toggle-navigation" })}
			/>
			<Navigation
				isActive={state.navigation}
				onCollapseClick={() => dispatch({ type: "toggle-navigation" })}
			/>
		</>
	);
};

export default Exams;
