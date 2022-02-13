import React, { useState } from "react";
import IQuestion from "../../models/IQuestion";
import Article from "../../components/question/Article";

type Props = {
	questions: IQuestion[];
};
const Articles = (props: Props) => {
	return (
		<>
			{props.questions.map(question => (
				<Article key={question._id} question={question} />
			))}
		</>
	);
};
export default Articles;
