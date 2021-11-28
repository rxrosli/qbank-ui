import React from "react";
import Icon from "../Icon";
import Avatar from "./Avatar";

type Props = {
	heading: string;
	onMenuClick?: React.MouseEventHandler<HTMLDivElement>;
	onAvatarClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Header = (props: Props) => {
	const { heading, onMenuClick, onAvatarClick } = props;
	return (
		<header className="header">
			<Icon type="hamburger" onClick={onMenuClick} />
			<div className="title">{heading}</div>
			<Avatar initials="RR" onAvatarClick={onAvatarClick} />
		</header>
	);
};

export default Header;
