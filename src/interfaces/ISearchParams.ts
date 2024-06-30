interface ISearchParams {
	query: string;
	pageNumber: number | null;
	filterReadingTime: boolean | null;
	filterMinValue: number | null;
	filterMaxValue: number | null;
	filterDateCreation: boolean | null;
	filterMinDate: string | null;
	filterMaxDate: string | null;
	sortByReadingTime: string | null;
	sortByDateCreation: string | null;
}

export type { ISearchParams };
