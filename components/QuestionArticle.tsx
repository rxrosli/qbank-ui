import React from "react";

type Props = {
	uuid: string;
	type: string;
	options: {
		trueOptions: number;
		falseOptions: number;
	};
	content: string;
	tags: string[];
};

const QuestionArticle = (props: Props) => {
	const { uuid, type, options, content, tags } = props;
	return (
		<article className="question-article">
			<div className="container">
				<section className="header-section">
					<div className="id">{uuid}</div>
					<div className="type">{type}</div>
					<div className="option-count true">{options.trueOptions}</div>
					<div className="option-count false">{options.falseOptions}</div>
				</section>
				<section className="content-section">{content}</section>
				<section className="tag-section">
					{tags.map((tag, index) => {
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
