import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Articles from "../../container/question/Articles";
import IQuestion from "../../models/IQuestion";
import React, { useEffect, useState } from "react";
import { useApi, authenticated } from "../../utilities/services";
import Router, { useRouter } from "next/router";

type SearchQuery = {
	target: string;
	query: string;
};

export default function Questions() {
	const router = useRouter();
	const { page } = router.query;
	const Question = useApi<IQuestion>("questions");
	const [isActive, setActive] = useState<boolean>(false);
	const [questions, setQuestions] = useState<IQuestion[]>();
	useEffect(() => {
		async function handleOnLoad() {
			if (typeof page !== "string") return;
			const result = await Question.find({}, { size: 10, page: parseInt(page) });
			setQuestions(result.data.data);
		}
		if (!authenticated()) {
			Router.push("/login");
			return;
		}
		if (!page) {
			return;
		}
		handleOnLoad();
	}, [page]);
	return questions ? (
		<div>
			<div className="page">
				<section className="section section--column">
					<Articles questions={questions} />
				</section>
			</div>
			<Header heading="Questions" onMenuClick={() => setActive(true)} />
			<Navigation isActive={isActive} onCollapseClick={() => setActive(false)} />
		</div>
	) : (
		<div>loading...</div>
	);
}
