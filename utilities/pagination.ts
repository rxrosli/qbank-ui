export type PaginationSettings = {
	size: number;
	page: number;
};

export type Pagination = {
	results: number;
	totalPages: number;
	setting: PaginationSettings;
};
