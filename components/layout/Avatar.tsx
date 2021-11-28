import React from "react";

type Props = {
	initials: string;
	onAvatarClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Avatar = (props: Props) => {
	const { initials, onAvatarClick } = props;
	return (
		<div className="avatar" onClick={onAvatarClick}>
			<div className="initials">{initials}</div>
		</div>
	);
};

export default Avatar;

// type OnClickHandler = (event: any) => void;

// // REACT.js
// function onClick(handleOnClick: OnClickHandler, initial ) {
// 	handleOnClick({ target: "I AM AN EVENT" })
// }

// function handleOnClick(event: any) {
// 	const {} = event
// }

// onClick(handleOnClick);
