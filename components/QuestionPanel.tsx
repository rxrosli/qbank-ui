import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import IQuestion from "../models/IQuestion";
import IOption from "../models/IOptions";
import OptionField from "./OptionField";

const data: IQuestion = {
	uuid: "5f2ed776-24a8-423b-b0b1-2401d1944cb0",
	type: "Multiple Choice",
	stem: "The adrenal medulla secretes which of the following in the greatest quantity?",
	options: [
		{
			isToggled: false,
			value: "Hello World"
		},
		{
			isToggled: false,
			value: "Hello World"
		},
		{
			isToggled: false,
			value: "Hello"
		},
		{
			isToggled: false,
			value: "Hello"
		}
	],
	tags: ["Parasitology", "Chemistry", "Biology"]
};

const QuestionPanel = () => {
	const [question, setQuestion] = useState<IQuestion>(data);

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
		// setOptions(options => {
		// 	return options.filter(previousOptions => previousOptions !== option);
		// });
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
