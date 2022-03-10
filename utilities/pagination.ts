export type PaginationSettings = {
	size: number;
	page: number;
};

export type Pagination = {
	url: string;
	currentPage: number;
	totalRecords: number;
	totalPages: number;
	size: number;
};

export function parsePagination(result: any, currentPage: number, url: string): Pagination {
	const totalRecords = result.data.meta.totalRecords as number;
	const totalPages = result.data.meta.totalPages as number;
	const size = result.data.meta.size as number;
	return { totalRecords, totalPages, size, currentPage, url };
}
