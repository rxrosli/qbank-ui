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

	const handleOnLogoutClick = async () => {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("refreshToken");
		await router.push("/login");
	};
	return (
		<nav className={isActive ? "nav is-active" : "nav"}>
			<div className="top-flex">
				<Icon type="chevron_duo_left" onClick={onCollapseClick} />
				<Link href="/questions/create" passHref>
					<a>
						<Icon type="plus" />
					</a>
				</Link>
				<Link href="/questions" passHref>
					<a>
						<Icon type="search" />
					</a>
				</Link>
			</div>
			<div className="bottom-flex">
				<Icon type="log_out" onClick={handleOnLogoutClick} />
			</div>
		</nav>
	);
};

export default Navigation;
