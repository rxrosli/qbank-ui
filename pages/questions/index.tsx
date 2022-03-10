import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import AddButton from "../../components/AddButton";
import PaginationSection from "../../components/Pagination";
import Articles from "../../container/question/Articles";
import IQuestion from "../../models/IQuestion";
import { useApi, authenticated } from "../../utilities/services";
import { Pagination, parsePagination } from "../../utilities/pagination";
import Loading from "../../components/Loading";

type SearchQuery = {
	target: string;
	query: string;
};

export default function Questions() {
	const router = useRouter();
	const { page, size } = router.query;
	const Question = useApi<IQuestion>("questions");
	const [isNavActive, setNavActive] = useState<boolean>(false);
	const [pagination, setPagination] = useState<Pagination>();
	const [questions, setQuestions] = useState<IQuestion[]>();
	useEffect(() => {
		async function handleOnLoad() {
			let currentPage = 1;
			let currentSize = 10;
			if (typeof page === "string") currentPage = parseInt(page);
			if (typeof size === "string") currentSize = parseInt(size);
			const result = await Question.find({}, { size: currentSize, page: currentPage });
			if (!result) return;
			setQuestions(result.data.data);
			setPagination(parsePagination(result, currentPage, "/questions"));
		}
		if (!authenticated()) {
			Router.push("/login");
			return;
		} else if (!router.isReady) {
			return;
		}
		handleOnLoad();
	}, [page, size]);
	return questions ? (
		<div>
			<div className="page">
				<AddButton label="Question" onClick={() => Router.push("/questions/create")} />
				<section className="section section--column">
					<Articles questions={questions} />
				</section>
				{pagination ? <PaginationSection pagination={pagination!} /> : null}
			</div>
			<Header heading="Questions" onMenuClick={() => setNavActive(true)} />
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
		</div>
	) : (
		<>
			<Loading />
			<Header heading="Questions" onMenuClick={() => setNavActive(true)} />
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
		</>
	);
}
