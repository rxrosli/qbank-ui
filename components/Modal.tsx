import React from "react";
import Icon from "./Icon";

type Props = {
	title?: string;
	isActive: boolean;
	onCloseClick?: React.MouseEventHandler<HTMLDivElement>;
	children?: React.ReactNode;
};

const Modal = (props: Props) => {
	const { title, isActive, onCloseClick, children } = props;
	const modalBackdropclassName = isActive
		? "modal__backdrop modal__backdrop--active"
		: "modal__backdrop";
	return (
		<div className={modalBackdropclassName}>
			<div className="modal">
				<div className="section">
					<div className="modal__title">{title}</div>
					<Icon type="close_small" className="modal__close" onClick={onCloseClick}></Icon>
				</div>
				<div className="modal__body">{children}</div>
			</div>
		</div>
	);
};

export default Modal;