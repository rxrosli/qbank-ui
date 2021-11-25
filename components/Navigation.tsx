import React, { Dispatch, SetStateAction } from "react";
import Icon from "./Icon";

type Props = {
	isActive: boolean;
	onCollapseClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Navigation = (props: Props) => {
	const { isActive, onCollapseClick } = props;
	return (
		<nav className={isActive ? "nav is-active" : "nav"}>
			<div className="top-flex">
				<Icon type="chevron_duo_left" onClick={onCollapseClick} />
				<Icon type="plus" />
				<Icon type="search" />
			</div>
			<div className="bottom-flex">
				<Icon type="settings_filled" />
			</div>
		</nav>
	);
};

export default Navigation;
