import React from "react";
import IQuestion from "../models/IQuestion";
import IOption from "../models/IOptions";
import Link from "next/link";

type Props = {
	question: IQuestion;
};

const QuestionArticle = (props: Props) => {
	const { question } = props;

	return (
		<article className="question-article">
			<div className="container">
				<section className="header-section">
					<div className="id">{question._id}</div>
					<div className="type">{question.type}</div>
					<div className="option-count true">
						{question.options.filter(option => option.condition === true).length}
					</div>
					<div className="option-count false">
						{question.options.filter(option => option.condition === false).length}
					</div>
				</section>
				<Link href={`/question?id=${question._id}`} passHref>
					<a className="content-section">{question.stem}</a>
				</Link>
				<section className="tag-section">
					{question.tags.map((tag, index) => {
						return (
							<span key={index} className="tag">
								{tag}
							</span>
						);
					})}
				</section>
			</div>
			<div className="tab" />
		</article>
	);
};

export default QuestionArticle;
