import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import QuestionPanel from "../../container/QuestionPanel";
import React, { useState } from "react";
import IQuestion from "../../models/IQuestion";

const data: IQuestion = {
	uuid: "5f2ed776-24a8-423b-b0b1-2401d1944cb0",
	type: "Multiple Choice",
	stem: "The adrenal medulla secretes which of the following in the greatest quantity?",
	options: [
		{
			isToggled: false,
			value: "Hello World"
		},
		{
			isToggled: false,
			value: "Hello World"
		},
		{
			isToggled: false,
			value: "Hello"
		},
		{
			isToggled: false,
			value: "Hello"
		}
	],
	tags: ["Parasitology", "Chemistry", "Biology"]
};

export default function createQuestion() {
	const [isActive, setActive] = useState(false);
	function getQuestionHeading(question: IQuestion): string {
		return `Question / ${question.uuid}`;
	}
	return (
		<div>
			<div className="page row">
				<QuestionPanel question={data} />
			</div>

			<Header heading={getQuestionHeading(data)} onMenuClick={() => setActive(true)} />
			<Navigation isActive={isActive} onCollapseClick={() => setActive(false)} />
		</div>
	);
}
