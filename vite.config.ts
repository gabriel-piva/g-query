import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@interfaces": path.resolve(__dirname, "./src/interfaces"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@http": path.resolve(__dirname, "./src/http"),
			"@services": path.resolve(__dirname, "./src/services")
		}
	},

	plugins: [react()]
});
