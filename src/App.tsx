import AppRoutes from "@/routes";
import Scroll from "@components/Scroll";
import Toaster from "@components/Toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppRoutes />
			<Toaster />
			<Scroll />
		</QueryClientProvider>
	);
}

export default App;
