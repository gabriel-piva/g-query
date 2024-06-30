import { http } from "@http/AxiosConfig";
import { IResultsPage } from "@interfaces/IResultPage";

const getFavorites = async (page: number): Promise<IResultsPage> => {
	try {
		const response = await http.get<IResultsPage>("search/fav", {
			params: {
				pageNumber: page
			}
		});
		return response.data;
	} catch (error) {
		console.log("Error fetching favorites:", error);
		throw new Error("Error fetching favorites.");
	}
};

const createFavorite = async (id: string) => {
	try {
		const response = await http.post(`search/fav/${id}`);
		return response.data;
	} catch (error) {
		console.log("Error adding favorite:", error);
		throw new Error("Error adding favorite.");
	}
};

const deleteFavorite = async (id: string) => {
	try {
		const response = await http.delete(`search/fav/${id}`);
		return response.data;
	} catch (error) {
		console.log("Error removing favorite:", error);
		throw new Error("Error removing favorite.");
	}
};

export { createFavorite, deleteFavorite, getFavorites };
