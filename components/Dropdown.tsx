import React from "react";
import Icon from "./Icon";
type Props = {
	options: string[];
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};
const Dropdown = (props: Props) => {
	const { options, onChange } = props;
	return (
		<>
			<select className="drop-select" onChange={onChange}>
				{options.map((option, index) => (
					<option className="drop-option" value={option} key={index}>
						{option}
					</option>
				))}
			</select>
		</>
	);
};

export default Dropdown;
