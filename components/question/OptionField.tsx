import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import Icon from "../Icon";
import Toggle from "../Toggle";
import IOptions from "../../models/IOptions";

type Props = {
	option: IOptions;
	onToggleClick: React.MouseEventHandler<HTMLDivElement>;
	onValueChange: React.ChangeEventHandler<HTMLTextAreaElement>;
	onDeleteClick: React.MouseEventHandler<HTMLDivElement>;
	onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>;
};

const OptionField = (props: Props) => {
	const { option, onToggleClick, onValueChange, onDeleteClick, onKeyPress } = props;
	return (
		<fieldset className="option-fieldset">
			<Toggle isToggled={option.condition} onToggleClick={onToggleClick} />
			<div className="field-group">
				<TextareaAutosize
					className="field"
					onChange={onValueChange}
					placeholder="Type your option"
					onKeyPress={onKeyPress}
					value={option.value}
				></TextareaAutosize>
				<Icon type="trash" onClick={onDeleteClick} />
			</div>
		</fieldset>
	);
};

export default OptionField;
