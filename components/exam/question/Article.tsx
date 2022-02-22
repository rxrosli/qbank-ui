import { useState } from "react";
import IQuestion from "../../../models/IQuestion";
import Icon from "../../Icon";
import SubArticle from "./SubArticle";

type Props = {
	question: IQuestion;
	action: "delete" | "add";
	onActionClick: React.MouseEventHandler<HTMLElement>;
};

const Article = (props: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { question, action, onActionClick } = props;

	const actionButton = (action: string) => {
		switch (action) {
			case "delete":
				return <Icon type="trash" className="question__delete" onClick={onActionClick} />;
			case "add":
				return (
					<button
						type="button"
						onClick={onActionClick}
						className="button button--primary question__add"
					>
						ADD
					</button>
				);
			default:
				return "error";
		}
	};

	return (
		<div className="section">
			<article className="article">
				<div className="container container--s-padding">
					<section className="section">
						<Icon
							type="caret_right"
							className={
								isOpen ? "question__caret question__caret--rotate" : "question__caret"
							}
							onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
						/>
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
								<div className="question__stem">{question.stem}</div>
							</section>
						</div>
					</section>
					<section className={isOpen ? "accordion accordion--active" : "accordion"}>
						{question.options.map((option, index) => (
							<SubArticle key={index} option={option} />
						))}
					</section>
				</div>
			</article>
			{actionButton(action)}
		</div>
	);
};

export default Article;
