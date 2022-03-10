import React from "react";
import Link from "next/link";
import { Pagination } from "../utilities/pagination";
import link from "next/link";

type PaginationLink = {
	isCurrentPage: boolean;
	label: string;
	href: string;
};
type PaginationProps = {
	pagination: Pagination;
};
const PaginationSection = (props: PaginationProps) => {
	const { url, currentPage, size, totalPages, totalRecords } = props.pagination;
	let indexLink = 1;
	let siblingCount = 10;
	let links: PaginationLink[] = [];
	if (siblingCount > totalPages) siblingCount = totalPages;
	for (let i = indexLink; i <= siblingCount; i++) {
		let isCurrentPage: boolean = i === currentPage;
		links.push({ isCurrentPage, label: i.toString(), href: `${url}?size=${size}&page=${i.toString()}` });
	}

	return (
		<div className="section section--justify-end">
			{links.map(link => (
				<Link key={link.href} href={link.href} passHref>
					<div className={link.isCurrentPage ? "pagination pagination--current" : "pagination"}>
						{link.label}
					</div>
				</Link>
			))}
		</div>
	);
};
export default PaginationSection;
