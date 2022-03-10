import React from "react";
import IQuestion from "../../models/IQuestion";
import Link from "next/link";

type Props = {
	question: IQuestion;
};

const Article = (props: Props) => {
	const { question } = props;

	return (
		<Link href={`/question?id=${question._id}`} passHref>
			<article className="article">
				<div className="container container--s-padding">
					<section className="section">
						<div className="question__id">{question._id}</div>
						<div className="question__type">{question.type}</div>
						<div className="question__options question__options--true">
							{question.options.filter(option => option.condition === true).length}
						</div>
						<div className="question__options question__options--false">
							{question.options.filter(option => option.condition === false).length}
						</div>
					</section>
					<section className="section">
						<a className="question__stem">{question.stem}</a>
					</section>
					<section className="section section--wrap">
						{question.tags.map((tag, index) => {
							return (
								<span key={index} className="question__tag">
									{tag}
								</span>
							);
						})}
					</section>
				</div>
				<div className="tab" />
			</article>
		</Link>
	);
};

export default Article;
