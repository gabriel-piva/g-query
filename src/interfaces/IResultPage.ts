import { IResult } from "@interfaces/IResult";

interface IResultsPage {
	total_hits: number;
	total_pages: number;
	current_page: number;
	suggestion?: string;
	search_time: number;
	results: IResult[];
}

export type { IResultsPage };
