import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import IExam from "../../models/IExam";
import Article from "../../components/exam/Article";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Modal from "../../components/Modal";
import AddButton from "../../components/AddButton";
import PaginationSection from "../../components/Pagination";
import Loading from "../../components/Loading";
import { authenticated, useApi } from "../../utilities/services";
import { Pagination, parsePagination } from "../../utilities/pagination";

type Details = {
	title?: string;
	description?: string;
};

export default function Exams() {
	const router = useRouter();
	const { page, size } = router.query;
	const Exam = useApi<IExam>("exams");
	const [details, setDetails] = useState<Details>({ title: "", description: "" });
	const [isNavActive, setNavActive] = useState(false);
	const [isCreateExamActive, setCreateExamActive] = useState(false);
	const [pagination, setPagination] = useState<Pagination>();
	const [exams, setExams] = useState<IExam[]>();

	async function createExam(details: Details, author: string) {
		const timestamp = new Date();
		const exam = {
			title: details.title ?? "",
			description: details.description ?? "",
			author,
			settings: {},
			questions: [],
			updatedAt: timestamp.toISOString()
		};
		const result = await Exam.create(exam);
		const id = result.data.data._id;
		Router.push("/exam?id=" + id);
	}

	useEffect(() => {
		async function handleOnLoad() {
			let currentPage = 1;
			let currentSize = 10;
			if (typeof page === "string") currentPage = parseInt(page);
			if (typeof size === "string") currentSize = parseInt(size);
			const result = await Exam.find({}, { size: currentSize, page: currentPage });
			if (!result) return;
			setExams(result.data.data);
			setPagination(parsePagination(result, currentPage, "/exams"));
		}
		if (!authenticated()) {
			Router.push("/login");
			return;
		} else if (!router.isReady) {
			return;
		}
		handleOnLoad();
	}, [page, size]);

	return exams ? (
		<>
			<div className="page">
				<AddButton label="Exam" onClick={() => setCreateExamActive(true)} />
				<section className="section section--column">
					{exams.map(exam => (
						<Article key={exam._id} exam={exam} />
					))}
				</section>
				{pagination ? <PaginationSection pagination={pagination!} /> : null}
			</div>
			<Header heading="Exams" onMenuClick={() => setNavActive(true)} />
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
			<Modal
				title="Create Exam"
				isActive={isCreateExamActive}
				width="xs"
				onCloseClick={() => setCreateExamActive(false)}
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
							createExam(details, window.localStorage.getItem("username") ?? "");
						}}
					>
						Create
					</button>
				</div>
			</Modal>
		</>
	) : (
		<>
			<Loading />
			<Header heading="Exams" onMenuClick={() => setNavActive(true)} />
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
		</>
	);
}
