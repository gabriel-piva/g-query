import { http } from "@http/AxiosConfig";
import { IShare } from "@interfaces/IShare";

const shareDoc = async (share: IShare) => {
	try {
		const response = await http.post(`search/send-email`, share);
		return response.data;
	} catch (error) {
		console.log("Error sharing document:", error);
		throw new Error("Error sharing document");
	}
};

export { shareDoc };
