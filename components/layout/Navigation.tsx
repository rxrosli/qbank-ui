import React from "react";
import Link from "next/link";
import Icon from "../Icon";
import { useRouter } from "next/router";

type Props = {
	isActive: boolean;
	onCollapseClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Navigation = (props: Props) => {
	const router = useRouter();
	const { isActive, onCollapseClick } = props;

	return (
		<nav className={isActive ? "nav is-active" : "nav"}>
			<div className="top-flex">
				<Icon className="icon" type="chevron_duo_left" onClick={onCollapseClick} />
				<Link href="/questions" passHref>
					<div className="nav__link">Q</div>
				</Link>
				<Link href="/exams" passHref>
					<div className="nav__link">E</div>
				</Link>
			</div>
		</nav>
	);
};

export default Navigation;
