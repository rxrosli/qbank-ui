import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import ArticleContainer from "../../container/ArticleContainer";
import Dropdown from "../../components/Dropdown";
import IQuestion from "../../models/IQuestion";
import React, { useState } from "react";
import Icon from "../../components/Icon";

const question: IQuestion = {
	uuid: "5f2ed776-24a8-423b-b0b1-2401d1944cb0",
	type: "Multiple Choice",
	stem: "The adrenal medulla secretes which of the following in the greatest quantity?",
	options: [
		{
			isToggled: true,
			value: "Hello World"
		},
		{
			isToggled: true,
			value: "Hello World"
		},
		{
			isToggled: false,
			value: "Hello"
		},
		{
			isToggled: false,
			value: "Hello"
		}
	],
	tags: ["Parasitology", "Chemistry", "Biology"]
};

const questionSet: IQuestion[] = [
	{ ...question },
	{ ...question },
	{ ...question },
	{ ...question },
	{ ...question }
];

type SearchQuery = {
	target: string;
	query: string;
};
function search() {
	const searchOptions = ["tag", "question", "id"];
	const [searchQuery, setSearchQuery] = useState<SearchQuery>({
		target: "tag",
		query: ""
	});
	const [isActive, setActive] = useState<boolean>(false);
	return (
		<div>
			<div className="page column">
				<div className="question-search">
					{/* TODO: add dropdown icon later */}
					{/* <Icon type="caret_down" /> */}
					<Dropdown
						options={searchOptions}
						onChange={e =>
							setSearchQuery({ ...searchQuery, target: e.currentTarget.value })
						}
					/>
					<input />
					<button />
				</div>

				<ArticleContainer questions={questionSet} />
			</div>
			<Header heading="Questions" onMenuClick={() => setActive(true)} />
			<Navigation isActive={isActive} onCollapseClick={() => setActive(false)} />
		</div>
	);
}

export default search;
