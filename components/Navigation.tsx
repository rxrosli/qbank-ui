import React from "react";
import Link from "next/link";
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
				<Link href="/questions/create">
					<Icon type="plus" />
				</Link>
				<Link href="/questions/view">
					<Icon type="search" />
				</Link>
			</div>
			<div className="bottom-flex">
				<Icon type="log_out" />
			</div>
		</nav>
	);
};

export default Navigation;
