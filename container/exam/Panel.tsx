import React from "react";
import Article from "../../components/exam/question/Article";
import Icon from "../../components/Icon";
import IExam from "../../models/IExam";
import IQuestion from "../../models/IQuestion";

type Props = {
	exam: IExam;
	onEditDetailsClick?: React.MouseEventHandler<HTMLDivElement>;
	onSettingsClick?: React.MouseEventHandler<HTMLDivElement>;
	onAddQuestionClick?: React.MouseEventHandler<HTMLButtonElement>;
	onDemoClick?: React.MouseEventHandler<HTMLButtonElement>;
	onSaveClick?: React.MouseEventHandler<HTMLButtonElement>;
	onDeleteQuestionClick: (question: IQuestion) => void;
};
const Panel = (props: Props) => {
	const {
		exam,
		onEditDetailsClick,
		onSettingsClick,
		onAddQuestionClick,
		onDemoClick,
		onSaveClick,
		onDeleteQuestionClick
	} = props;
	return (
		<>
			<form className="exam">
				<section className="section section--align-center">
					<div className="exam__title">{exam.title}</div>
					<Icon type="edit" className="exam__edit" onClick={onEditDetailsClick}></Icon>
					<div className="spacer"></div>
					<Icon type="settings_filled" className="exam__settings" onClick={onSettingsClick}></Icon>
					{onDemoClick ? (
						<button type="button" className="button button--primary" onClick={onDemoClick}>
							Demo
						</button>
					) : null}
					{onSaveClick ? (
						<button type="button" className="button button--primary" onClick={onSaveClick}>
							Save
						</button>
					) : null}
				</section>
				<section className="section section--y-margin">
					<div className="exam__description">{exam.description}</div>
				</section>
				<div className="section section--y-margin">
					<span className="exam__author">{exam.author}</span>
					<span className="exam__dot-span">•</span>
					<span className="exam__update-date">{exam.updatedAt!.slice(0, 10)}</span>
				</div>
				<div className="section section--y-margin">
					<button type="button" className="button button--tertiary" onClick={onAddQuestionClick}>
						<span>Question</span>
						<Icon type="plus" className="button__icon"></Icon>
					</button>
				</div>
				<div className="section section--column">
					{exam.questions.map((question, index) => (
						<Article
							key={`${index}-${question._id}`}
							question={question}
							action="delete"
							onActionClick={() => onDeleteQuestionClick(question)}
						/>
					))}
				</div>
			</form>
		</>
	);
};

export default Panel;
