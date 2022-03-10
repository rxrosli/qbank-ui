import router from "next/router";
import React from "react";
import Icon from "../Icon";
import Avatar from "./Avatar";

type Props = {
	heading: string;
	onMenuClick?: React.MouseEventHandler<HTMLDivElement>;
	onAvatarClick?: React.MouseEventHandler<HTMLDivElement>;
};

const handleOnLogoutClick = async () => {
	window.localStorage.removeItem("username");
	window.localStorage.removeItem("token");
	window.localStorage.removeItem("refreshToken");
	await router.push("/login");
};

const Header = (props: Props) => {
	const { heading, onMenuClick, onAvatarClick } = props;
	return (
		<header className="header">
			<Icon type="hamburger" onClick={onMenuClick} />
			<div className="title">{heading}</div>
			<Avatar initials="RR" onAvatarClick={onAvatarClick} />
			<Icon className="icon icon--center" type="log_out" onClick={handleOnLogoutClick} />
		</header>
	);
};

export default Header;
