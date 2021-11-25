import React from "react";

type Props = {
	isToggled: boolean;
	onToggleClick: React.MouseEventHandler<HTMLDivElement>;
};

const Toggle = (props: Props) => {
	const { isToggled, onToggleClick } = props;
	return (
		<div className={isToggled ? "toggle is-active" : "toggle"} onClick={onToggleClick}>
			<span className="slider" />
		</div>
	);
};

export default Toggle;
