import DocsContainer from "@components/DocsContainer";
import SkeletonDocsContainer from "@components/DocsContainer/SkeletonContainer";
import ErrorMessage from "@components/ErrorMessage";
import { ModalFilter } from "@components/Modal";
import SearchBar from "@components/SearchBar";
import { getSearch } from "@http/Search";
import { ISearchParams } from "@interfaces/ISearchParams";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Results() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const q = searchParams.get("q");

	const [modalFilterOpen, setModalFilterOpen] = useState(false);
	const toggleModalFilter = () => setModalFilterOpen(!modalFilterOpen);

	const [params, setParams] = useState<ISearchParams>({
		query: q || "",
		pageNumber: 1,
		filterReadingTime: null,
		filterMinValue: null,
		filterMaxValue: null,
		filterDateCreation: null,
		filterMinDate: null,
		filterMaxDate: null,
		sortByReadingTime: null,
		sortByDateCreation: null
	});

	const [query, setQuery] = useState<string>(q || "");
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState({
		filterReadingTime: false,
		filterMinValue: "",
		filterMaxValue: "",
		filterDateCreation: false,
		filterMinDate: "",
		filterMaxDate: "",
		sortByReadingTime: "",
		sortByDateCreation: ""
	});

	useEffect(() => {
		setParams(prev => ({
			...prev,
			pageNumber: page
		}));
	}, [page]);

	const submitSearch = () => {
		setPage(1);
		setParams({
			query: query,
			pageNumber: 1,
			filterDateCreation: filters.filterMaxDate !== "" || filters.filterMinDate !== "",
			filterMaxDate: filters.filterMaxDate || null,
			filterMinDate: filters.filterMinDate || null,
			filterReadingTime: filters.filterMaxValue !== "" || filters.filterMinValue !== "",
			filterMinValue: parseInt(filters.filterMinValue) || null,
			filterMaxValue: parseInt(filters.filterMaxValue) || null,
			sortByDateCreation: filters.sortByDateCreation || null,
			sortByReadingTime: filters.sortByReadingTime || null
		});
	};

	const handleSearch = () => {
		if (query && query !== q && params.query !== query) {
			navigate(`/results?q=${query}`, { replace: true });
			submitSearch();
		}
	};

	const {
		data: resultsPage,
		isLoading,
		isPlaceholderData,
		isError
	} = useQuery({
		queryKey: ["search", params],
		queryFn: () => getSearch(params),
		placeholderData: keepPreviousData
	});

	return (
		<>
			<SearchBar
				value={query}
				placeholder="Search on G-Query"
				onChange={setQuery}
				onSearch={handleSearch}
				size="full"
				onFilter={toggleModalFilter}
			/>

			{isLoading && !isPlaceholderData ? (
				<SkeletonDocsContainer />
			) : (
				resultsPage !== undefined && (
					<DocsContainer
						resultsPage={resultsPage}
						setPage={setPage}
						params={params}
						isLoading={isPlaceholderData}
					/>
				)
			)}

			{isError && <ErrorMessage />}

			<ModalFilter
				filter={filters}
				setFilter={setFilters}
				onSearch={submitSearch}
				open={modalFilterOpen}
				onClose={toggleModalFilter}
			/>
		</>
	);
}

export default Results;
