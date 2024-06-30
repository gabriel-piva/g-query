import Favorites from "@pages/Favorites";
import Home from "@pages/Home";
import Layout from "@pages/Layout";
import Results from "@pages/Results";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="results" element={<Results />} />
					<Route path="favorites" element={<Favorites />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
