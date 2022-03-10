import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Panel from "../../container/question/Panel";
import IQuestion from "../../models/IQuestion";
import { useApi, authenticated } from "../../utilities/services";

export default function Question() {
	const router = useRouter();
	const { id } = router.query;
	const Question = useApi<IQuestion>("questions");
	const [isNavActive, setNavActive] = useState(false);
	const [question, setQuestion] = useState<IQuestion>();

	async function handleOnSaveClick(question: IQuestion) {
		await Question.update(question._id!, question);
	}

	async function handleOnDeleteClick() {
		if (typeof id !== "string") {
			Router.push("/questions/page?=1");
			return;
		}
		await Question.delete(id!);
		Router.push("/questions/page?=1");
	}

	useEffect(() => {
		async function handleOnLoad() {
			if (typeof id !== "string") {
				Router.push("/questions/page?=1");
				return;
			}
			const result = await Question.findById(id);
			setQuestion(result.data.data);
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
			<Header heading={`Question / ${question._id}`} onMenuClick={() => setNavActive(true)} />
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
		</div>
	) : (
		<div>loading...</div>
	);
}
