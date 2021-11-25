import Head from "next/head";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import QuestionArticle from "../../components/QuestionArticle";
import React from "react";

function view() {
	return (
		<div>
			<Head>
				<title>qBank</title>
				<meta name="description" content="Question Repository System" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<QuestionArticle
				uuid="34fb503b"
				type="Multiple Choice"
				options={{ trueOptions: 3, falseOptions: 4 }}
				content="The adrenal medulla secretes which of the following in the greatest quantity?"
				tags={["Parasitology", "Chemistry", "Biology"]}
			/>
		</div>
	);
}

export default view;
