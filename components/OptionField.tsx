import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import Icon from "./Icon";
import Toggle from "./Toggle";
import IOptions from "../models/IOptions";

type Props = {
	option: IOptions;
	onToggleClick: React.MouseEventHandler<HTMLDivElement>;
	onValueChange: React.ChangeEventHandler<HTMLTextAreaElement>;
	onDeleteClick: React.MouseEventHandler<HTMLDivElement>;
};

const OptionField = (props: Props) => {
	const { option, onToggleClick, onValueChange, onDeleteClick } = props;
	return (
		<fieldset className="option-fieldset">
			<Toggle isToggled={option.isToggled} onToggleClick={onToggleClick} />
			<div className="field-group">
				<TextareaAutosize
					className="field"
					onChange={onValueChange}
					placeholder="Type your option"
					value={option.value}
				></TextareaAutosize>
				<Icon type="trash" onClick={onDeleteClick} />
			</div>
		</fieldset>
	);
};

export default OptionField;
