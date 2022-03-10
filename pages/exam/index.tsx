import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Icon from "../../components/Icon";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import Panel from "../../container/exam/Panel";
import SearchArticles from "../../container/exam/SearchArticles";
import IExam from "../../models/IExam";
import IQuestion from "../../models/IQuestion";
import { useApi } from "../../utilities/services";

type Details = {
	title?: string;
	description?: string;
};

export default function Exam() {
	const router = useRouter();
	const { id } = router.query;
	const Exam = useApi<IExam>("exams");
	const Question = useApi<IQuestion>("questions");
	const [exam, setExam] = useState<IExam>();
	const [questions, setQuestions] = useState<IQuestion[]>();
	const [isNavActive, setNavActive] = useState<boolean>(false);
	const [isEditDetailsActive, setEditDetailsActive] = useState<boolean>(false);
	const [isAddQuestionActive, setAddQuestionActive] = useState<boolean>(false);
	const [isWarningActive, setWarningActive] = useState<boolean>(false);
	const [details, setDetails] = useState<Details>();

	async function fetchQuestions() {
		const result = await Question.find({});
		if (!result) return;
		setQuestions(result.data.data);
	}
	async function deleteExamQuestion(question: IQuestion) {
		if (!exam) return;
		const updatedExam = {
			...exam,
			questions: exam.questions.filter(prevQuestion => prevQuestion !== question)
		};
		setExam(updatedExam);
		await Exam.update(exam._id!, updatedExam);
	}
	async function addExamQuestion(question: IQuestion) {
		if (!exam) return;
		const updatedExam = { ...exam, questions: [...exam.questions, question] };
		setExam(updatedExam);
		await Exam.update(exam._id!, updatedExam);
	}
	async function saveDetails() {
		if (!exam || !details) return;
		setExam({ ...exam, ...details });
		await Exam.update(exam._id!, exam);
	}
	useEffect(() => {
		async function fetchExam() {
			if (typeof id !== "string") {
				router.push("/exams");
				return;
			}
			const result = await Exam.findById(id);
			if (!result) return;
			setExam(result.data.data);
		}
		if (!router.isReady) return;
		fetchExam();
	}, [id]);
	return exam ? (
		<>
			<div className="page">
				<Icon type="thin_long_left" onClick={() => router.push("/exams")} />
				<Panel
					exam={exam}
					onSettingsClick={() => setWarningActive(true)}
					onDemoClick={() => setWarningActive(true)}
					onDeleteQuestionClick={deleteExamQuestion}
					onEditDetailsClick={() => {
						setDetails({ title: exam.title, description: exam.description });
						setEditDetailsActive(true);
					}}
					onAddQuestionClick={() => {
						fetchQuestions();
						setAddQuestionActive(true);
					}}
				></Panel>
			</div>
			<Header heading={`Exam / ${exam._id}`} onMenuClick={() => setNavActive(true)} />
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
			<Modal
				title="Edit details"
				isActive={isEditDetailsActive}
				width="xs"
				onCloseClick={() => setEditDetailsActive(false)}
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
						onClick={() => {
							saveDetails();
							setEditDetailsActive(false);
						}}
					>
						SAVE
					</button>
				</div>
			</Modal>
			<Modal title="Settings" isActive={isWarningActive} onCloseClick={() => setWarningActive(false)}>
				<div className="warn">Coming Soon</div>
			</Modal>
			<Modal
				title="Add Question"
				isActive={isAddQuestionActive}
				onCloseClick={() => setAddQuestionActive(false)}
			>
				{questions ? <SearchArticles questions={questions} onAddClick={addExamQuestion} /> : null}
			</Modal>
		</>
	) : (
		<>
			<Loading />
			<Header heading="Exam / ???" onMenuClick={() => setNavActive(true)} />
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
		</>
	);
}
