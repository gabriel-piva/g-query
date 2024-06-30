interface IResult {
	id: string;
	title: string;
	url: string;
	abs: string;
	highlight: string | null;
	reading_time: number;
	date_creation: string;
	isFavorite: boolean;
}

export type { IResult };
