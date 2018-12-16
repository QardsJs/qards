/**
 * Interfaces that don't belong to a certain file
 */

export interface Pagination {
	isLast: boolean;
	isFirst: boolean;
	prevPage: string;
	nextPage: string;
	numPages: number;
	currentPage: number;
}
