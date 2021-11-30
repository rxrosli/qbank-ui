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
				{options.map(option => (
					<option className="drop-option" value={option} children={option} />
				))}
			</select>
		</>
	);
};

export default Dropdown;
