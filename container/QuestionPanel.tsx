import React, { useState } from "react";
import IQuestion from "../models/IQuestion";
import IOption from "../models/IOptions";
import TextareaAutosize from "react-textarea-autosize";
import OptionField from "../components/OptionField";
import Icon from "../components/Icon";
import Dropdown from "../components/Dropdown";

type Props = {
	question: IQuestion;
	setQuestion: (question: IQuestion) => void;
	onSaveClick: React.MouseEventHandler<HTMLButtonElement>;
};
const QuestionPanel = (props: Props) => {
	const { question, setQuestion, onSaveClick } = props;
	const [tag, setTag] = useState<string>("");

	function toggleOption(option: IOption) {
		setQuestion({
			...question,
			options: question.options.map(prevOpt =>
				prevOpt !== option ? prevOpt : { ...option, condition: !prevOpt.condition }
			)
		});
	}
	function changeValue(option: IOption, value: string) {
		setQuestion({
			...question,
			options: question.options.map(prevOpt =>
				prevOpt !== option ? prevOpt : { ...option, value: value }
			)
		});
	}
	function addOptions() {
		setQuestion({
			...question,
			options: [...question.options, { condition: false, value: "" }]
		});
	}
	function deleteOption(option: IOption) {
		setQuestion({
			...question,
			options: question.options.filter(prevOpt => prevOpt !== option)
		});
	}
	function addTag(tag: string) {
		if (!question.tags.some(PrevTag => PrevTag === tag || tag === "")) {
			setQuestion({ ...question, tags: [...question.tags, tag] });
		}
		setTag("");
	}
	function deleteTag(tag: string) {
		setQuestion({ ...question, tags: question.tags.filter(prevTag => prevTag !== tag) });
	}
	return (
		<>
			<form className="question-panel">
				<TextareaAutosize
					placeholder="Type your question"
					value={props.question.stem}
					onChange={e => setQuestion({ ...question, stem: e.currentTarget.value })}
				/>
				{props.question.options.map((option, index) => (
					<OptionField
						key={option.value}
						option={option}
						onToggleClick={() => toggleOption(option)}
						onValueChange={e => changeValue(option, e.currentTarget.value)}
						onDeleteClick={() => deleteOption(option)}
						onKeyPress={e => {
							if (e.code === "Enter") {
								e.preventDefault();
								addOptions();
							}
						}}
					/>
				))}
				<button
					className="option_button--add"
					type="button"
					onClick={addOptions}
					children="Add option"
				/>
			</form>

			<form className="question-settings">
				<button
					children="Save"
					type="button"
					className="question_button--save"
					onClick={onSaveClick}
				/>

				<div className="input-group">
					<label children="Type" />
					<Dropdown
						options={["Multiple Choice", "True/False"]}
						onChange={e => setQuestion({ ...question, type: e.currentTarget.value })}
					/>
				</div>

				<div className="input-group">
					<label children="Tags" />
					<div className="input-section">
						<input
							className="tag_input"
							placeholder="Add tag"
							onChange={e => setTag(e.currentTarget.value)}
							onKeyPress={e => {
								if (e.code === "Enter") {
									e.preventDefault();
									addTag(tag);
								}
							}}
							value={tag}
						/>
						<button type="button" className="tag_button--add" onClick={() => addTag(tag)}>
							<Icon type="plus"></Icon>
						</button>
					</div>
				</div>

				<div className="tag_section">
					{question.tags.map(tag => (
						<span className="tag" key={tag}>
							{tag}
							<Icon type="close_small" onClick={() => deleteTag(tag)} />
						</span>
					))}
				</div>
			</form>
		</>
	);
};

export default QuestionPanel;
