import React, { useState } from "react";
import IQuestion from "../models/IQuestion";
import QuestionArticle from "../components/QuestionArticle";

type Props = {
	questions: IQuestion[];
};
const QuestionArticles = (props: Props) => {
	return (
		<div>
			{props.questions.map(question => (
				<QuestionArticle key={question._id} question={question} />
			))}
		</div>
	);
};
export default QuestionArticles;
