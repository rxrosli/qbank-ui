import React, { useState } from "react";
import IQuestion from "../models/IQuestion";
import QuestionArticle from "../components/QuestionArticle";

type Props = {
	questions: IQuestion[];
};
const Articles = (props: Props) => {
	return (
		<div>
			{props.questions.map(question => (
				<QuestionArticle question={question} />
			))}
		</div>
	);
};
export default Articles;
