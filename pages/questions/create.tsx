import Head from "next/head";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
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
			<Head>
				<title>qBank</title>
				<meta name="description" content="Question Repository System" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="page row">
				<QuestionPanel question={data} />
			</div>

			<Header heading={getQuestionHeading(data)} onMenuClick={() => setActive(true)} />
			<Navigation isActive={isActive} onCollapseClick={() => setActive(false)} />
		</div>
	);
}
