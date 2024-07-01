import axios from "axios";

const BACK_URL = import.meta.env.VITE_BACK_URL;

const http = axios.create({
	baseURL: BACK_URL,
	headers: {
		Accept: "application/json",
		Content: "application/json",
		"ngrok-skip-browser-warning": "69420"
	}
});

export { http };
