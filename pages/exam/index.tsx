import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Modal from "../../components/Modal";
import Panel from "../../container/exam/Panel";
import SearchArticles from "../../container/exam/SearchArticles";
import IExam from "../../models/IExam";
import IQuestion from "../../models/IQuestion";
import {
	authenticatePageRequest,
	fetchApi,
	FetchApiEvents,
	FetchApiParams
} from "../../services/fetch";

type State = {
	navigation: boolean;
	editDetails: boolean;
	settings: boolean;
	addQuestion: boolean;
	warning: boolean;
};
type Action =
	| { type: "toggle-navigation" }
	| { type: "toggle-editDetails" }
	| { type: "toggle-settings" }
	| { type: "toggle-addQuestion" }
	| { type: "toggle-warning" };
type Details = {
	title?: string;
	description?: string;
};
const initState: State = {
	navigation: false,
	editDetails: false,
	settings: false,
	addQuestion: false,
	warning: false
};
export default function Exam() {
	const router = useRouter();
	const { id } = router.query;
	const reducer = (state: State, action: Action): State => {
		switch (action.type) {
			case "toggle-navigation":
				return { ...state, navigation: !state.navigation };
			case "toggle-editDetails":
				state ? setDetails({ title: exam?.title, description: exam?.description }) : null;
				return { ...state, editDetails: !state.editDetails };
			case "toggle-settings":
				return { ...state, settings: !state.settings };
			case "toggle-addQuestion":
				return { ...state, addQuestion: !state.addQuestion };
			case "toggle-warning":
				return { ...state, warning: !state.warning };
			default:
				throw new Error();
		}
	};
	const [exam, setExam] = useState<IExam>();
	const [questions, setQuestions] = useState<IQuestion[]>();
	const [details, setDetails] = useState<Details>();
	const [state, dispatch] = useReducer(reducer, initState);
	const uri: string = "/exams/" + id;

	const events: FetchApiEvents = {
		onSuccess: async data => {
			setExam(data.data.data);
			console.log(JSON.stringify(data, null, 2));
		},
		onError: async error => {
			console.log(JSON.stringify(error, null, 2));
		}
	};
	async function fetchQuestions() {
		await fetchApi(
			{ uri: "/questions", method: "GET" },
			{ ...events, onSuccess: async (data: any) => setQuestions(data.data.data) }
		);
	}
	async function deleteExamQuestion(question: IQuestion) {
		exam
			? await fetchApi(
					{
						uri: uri,
						method: "PATCH",
						body: {
							...exam,
							questions: exam.questions.filter(prevQuestion => prevQuestion !== question)
						}
					},
					events
			  )
			: null;
	}
	async function addExamQuestion(question: IQuestion) {
		exam
			? await fetchApi(
					{
						uri: uri,
						method: "PATCH",
						body: { ...exam, questions: [...exam.questions, question] }
					},
					events
			  )
			: null;
	}

	function saveDetails() {
		fetchApi({ uri: uri, method: "PATCH", body: { ...exam, ...details } }, events);
		dispatch({ type: "toggle-editDetails" });
	}
	useEffect(() => {
		if (!router.isReady) return;
		authenticatePageRequest();
		fetchApi({ uri: uri, method: "GET" }, events);
		fetchQuestions();
	}, [id]);

	return exam ? (
		<>
			<div className="page">
				<Panel
					exam={exam}
					onEditDetailsClick={() => dispatch({ type: "toggle-editDetails" })}
					onSettingsClick={() => dispatch({ type: "toggle-settings" })}
					onAddQuestionClick={() => dispatch({ type: "toggle-addQuestion" })}
					onDemoClick={() => dispatch({ type: "toggle-warning" })}
					onDeleteQuestionClick={deleteExamQuestion}
				></Panel>
			</div>
			<Header
				heading={`Exam / ${exam._id}`}
				onMenuClick={() => dispatch({ type: "toggle-navigation" })}
			/>
			<Navigation
				isActive={state.navigation}
				onCollapseClick={() => dispatch({ type: "toggle-navigation" })}
			/>
			<Modal
				title="Edit details"
				isActive={state.editDetails}
				width="xs"
				onCloseClick={() => dispatch({ type: "toggle-editDetails" })}
			>
				<div className="section section--column">
					<label>Title</label>
					<input
						className="modal__input"
						value={details?.title}
						onChange={e => setDetails({ ...details, title: e.currentTarget.value })}
					/>
					<textarea
						value={details?.description}
						placeholder="Add an optional description"
						onChange={e => setDetails({ ...details, description: e.currentTarget.value })}
					></textarea>
					<button
						className="button button--primary button--align-end"
						type="button"
						onClick={() => saveDetails()}
					>
						SAVE
					</button>
				</div>
			</Modal>
			<Modal
				title="Settings"
				isActive={state.settings}
				onCloseClick={() => dispatch({ type: "toggle-settings" })}
			>
				<div className="warn">Coming Soon</div>
			</Modal>
			<Modal
				title="Add Question"
				isActive={state.addQuestion}
				onCloseClick={() => dispatch({ type: "toggle-addQuestion" })}
			>
				{questions ? (
					<SearchArticles questions={questions} onAddClick={addExamQuestion} />
				) : null}
			</Modal>
			<Modal
				isActive={state.warning}
				onCloseClick={() => dispatch({ type: "toggle-warning" })}
			>
				<div className="warn">Coming Soon</div>
			</Modal>
		</>
	) : (
		<>
			<div>loading...</div>
			<Header
				heading="Exam / ???"
				onMenuClick={() => dispatch({ type: "toggle-navigation" })}
			/>
			<Navigation
				isActive={state.navigation}
				onCollapseClick={() => dispatch({ type: "toggle-navigation" })}
			/>
		</>
	);
}
