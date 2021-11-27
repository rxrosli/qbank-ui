import Head from "next/head";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import ArticleContainer from "../../container/ArticleContainer";
import IQuestion from "../../models/IQuestion";
import React from "react";

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
function view() {
	return (
		<div>
			<Head>
				<title>qBank</title>
				<meta name="description" content="Question Repository System" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="page column">
				<ArticleContainer questions={questionSet} />
			</div>
		</div>
	);
}

export default view;
