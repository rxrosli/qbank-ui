import React, { useState } from "react";
import IQuestion from "../models/IQuestion";
import QuestionArticle from "../components/QuestionArticle";

type Props = {
	questions: IQuestion[];
};

const ArticleContainer = (props: Props) => {
	const [questions, setQuestions] = useState<IQuestion[]>(props.questions);

	return (
		<div>
			{questions.map(question => (
				<QuestionArticle question={question} />
			))}
		</div>
	);
};

export default ArticleContainer;
