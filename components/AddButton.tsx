import React from "react";
import Icon from "./Icon";

type Props = {
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const AddButton = (props: Props) => {
	const { label, onClick } = props;
	return (
		<div className="section section--y-margin section--justify-end">
			<button type="button" className="button button--tertiary" onClick={onClick}>
				<span>{label}</span>
				<Icon type="plus" className="button__icon"></Icon>
			</button>
		</div>
	);
};

export default AddButton;
