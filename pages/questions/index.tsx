import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import ArticleContainer from "../../container/ArticleContainer";
import IQuestion from "../../models/IQuestion";
import React, { useState } from "react";

const question: IQuestion = {
	uuid: "5f2ed776-24a8-423b-b0b1-2401d1944cb0",
	type: "Multiple Choice",
	stem: "The adrenal medulla secretes which of the following in the greatest quantity?",
	options: [
		{
			isToggled: true,
			value: "Hello World"
		},
		{
			isToggled: true,
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

const questionSet: IQuestion[] = [
	{ ...question },
	{ ...question },
	{ ...question },
	{ ...question },
	{ ...question }
];
function search() {
	const [isActive, setActive] = useState(false);
	return (
		<div>
			<div className="page column">
				<ArticleContainer questions={questionSet} />
			</div>
			<Header heading="Questions" onMenuClick={() => setActive(true)} />
			<Navigation isActive={isActive} onCollapseClick={() => setActive(false)} />
		</div>
	);
}

export default search;
