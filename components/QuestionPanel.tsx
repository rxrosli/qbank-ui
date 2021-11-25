import React, { useState } from "react";
import IQuestion from "../models/IQuestion";
import IOption from "../models/IOptions";
import TextareaAutosize from "react-textarea-autosize";
import OptionField from "./OptionField";

type Props = {
	question: IQuestion;
};
const QuestionPanel = (props: Props) => {
	const [question, setQuestion] = useState<IQuestion>(props.question);

	function toggleOption(option: IOption) {
		setQuestion({
			...question,
			options: question.options.map(prevOpt =>
				prevOpt !== option ? prevOpt : { ...option, isToggled: !prevOpt.isToggled }
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
			options: [...question.options, { isToggled: false, value: "" }]
		});
	}
	function deleteOption(option: IOption) {
		setQuestion({
			...question,
			options: question.options.filter(prevOpt => prevOpt !== option)
		});
	}

	return (
		<>
			<form className="question-panel">
				<TextareaAutosize
					placeholder="Type your question"
					value={question.stem}
					onChange={e => setQuestion({ ...question, stem: e.currentTarget.value })}
				/>
				{question.options.map((option, index) => (
					<OptionField
						key={index}
						option={option}
						onToggleClick={() => toggleOption(option)}
						onValueChange={e => changeValue(option, e.currentTarget.value)}
						onDeleteClick={() => deleteOption(option)}
					/>
				))}
				<button
					className="option_button--add"
					type="button"
					onClick={addOptions}
					children="Add option"
				/>
			</form>
		</>
	);
};

export default QuestionPanel;
