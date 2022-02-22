import React, { useState } from "react";
import Article from "../../components/exam/question/Article";
import IQuestion from "../../models/IQuestion";

type Props = {
	questions: IQuestion[];
	onAddClick: (question: IQuestion) => void;
};
const SearchArticles = (props: Props) => {
	const { questions, onAddClick } = props;
	return (
		<>
			{questions.map(question => (
				<Article
					key={question._id}
					question={question}
					action="add"
					onActionClick={() => onAddClick(question)}
				/>
			))}
		</>
	);
};
export default SearchArticles;
