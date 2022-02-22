import Link from "next/link";
import React from "react";
import IExam from "../../models/IExam";

type Props = {
	exam: IExam;
};

export default function Article(props: Props) {
	const { _id, title, author, questions } = props.exam;

	return (
		<article className="article exam exam--article">
			<div className="container container--s-padding">
				<div className="section">
					<div className="exam__author">{author}</div>
					<div className="exam__questions">{questions.length}</div>
				</div>
				<div className="section">
					<Link href={`/exam?id=${_id}`} passHref>
						<div className="exam__title">{title}</div>
					</Link>
				</div>
			</div>
		</article>
	);
}
