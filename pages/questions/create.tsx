import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Panel from "../../container/question/Panel";
import React, { useEffect, useState } from "react";
import IQuestion from "../../models/IQuestion";
import { useApi, authenticated } from "../../utilities/services";
import router from "next/dist/client/router";
import Icon from "../../components/Icon";

const initQuestion: IQuestion = {
	type: "Multiple Choice",
	stem: "",
	options: [],
	tags: []
};

export default function CreateQuestion() {
	const Question = useApi<IQuestion>("questions");
	const [isNavActive, setNavActive] = useState(false);
	const [question, setQuestion] = useState<IQuestion>(initQuestion);

	async function pushQuestion(question: IQuestion) {
		const result = await Question.create(question);
		router.push("/question?id=" + result.data.data._id);
	}

	useEffect(() => {
		if (!authenticated()) {
			router.push("/login");
			return;
		}
	}, []);

	return (
		<div>
			<div className="page">
				<Icon type="thin_long_left" onClick={() => router.push("/questions")} />
				<div className="section">
					<Panel question={question} setQuestion={setQuestion} onSaveClick={() => pushQuestion(question)} />
				</div>

				<Header heading={`Question / Create`} onMenuClick={() => setNavActive(true)} />
				<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
			</div>
		</div>
	);
}
