import React from "react";
import IOption from "../../../models/IOptions";
import Icon from "../../Icon";

type Props = {
	option: IOption;
};

const SubArticle = (props: Props) => {
	const { option } = props;
	return (
		<article className="sub-article">
			<Icon
				type={option.condition ? "condition_true" : "condition_false"}
				className={
					+option.condition
						? "option__condition option__condition--true"
						: "option__condition option__condition--false"
				}
			></Icon>
			<div className="container container--s-padding">
				<section className="section">
					<div className="option__value">{option.value}</div>
				</section>
			</div>
		</article>
	);
};

export default SubArticle;
