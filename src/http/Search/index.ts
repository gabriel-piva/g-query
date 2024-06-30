import { http } from "@http/AxiosConfig";
import { IResultsPage } from "@interfaces/IResultPage";
import { ISearchParams } from "@interfaces/ISearchParams";

const getSearch = async (params: ISearchParams): Promise<IResultsPage> => {
	try {
		const response = await http.get<IResultsPage>("search", {
			params
		});
		return response.data;
	} catch (error) {
		console.log("Error fetching results:", error);
		throw new Error("Error fetching results.");
	}
};

export { getSearch };
