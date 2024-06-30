import { IResult } from "@interfaces/IResult";

interface IShare {
	receiver: string;
	results: IResult[];
}

export type { IShare };
