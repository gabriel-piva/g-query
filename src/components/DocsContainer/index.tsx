import Doc from "@components/Doc";
import SkeletonDoc from "@components/Doc/SkeletonDoc";
import { IResultsPage } from "@interfaces/IResultPage";
import { ISearchParams } from "@interfaces/ISearchParams";
import { MdSearchOff as SearchErrorIcon } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import styles from "./DocsContainer.module.css";

interface DocsContainerProps {
	resultsPage: IResultsPage;
	setPage: (page: number) => void;
	params?: ISearchParams;
	isLoading?: boolean;
}
function DocsContainer({ resultsPage, setPage, params, isLoading = false }: DocsContainerProps) {
	const navigate = useNavigate();

	const handleSuggestionClick = () => {
		if (resultsPage.suggestion) {
			navigate(`/results?q=${resultsPage.suggestion}`);
			location.reload();
		}
	};
	const getAppliedFilters = () => {
		if (params) {
			const {
				sortByDateCreation,
				sortByReadingTime,
				filterMinValue,
				filterMaxValue,
				filterMinDate,
				filterMaxDate
			} = params;
			const filters = [];
			if (filterMinDate !== null || filterMaxDate !== null) filters.push("Date Range");
			if (sortByDateCreation || sortByReadingTime) filters.push("Sorting");
			if (filterMinValue !== null || filterMaxValue !== null) filters.push("Reading Time");
			if (filters.length > 0) return `${filters.join(" | ")}`;
			return "";
		}
		return "";
	};
	const appliedFilters = getAppliedFilters();

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: "smooth"
		});
	};

	return (
		<>
			<div className={styles.docs_container}>
				<header className={styles.docs_header}>
					<div className={styles.doc_details}>
						{resultsPage.suggestion && (
							<>
								<span>
									Did you mean{" "}
									<strong onClick={handleSuggestionClick}>
										{resultsPage.suggestion}?
									</strong>
								</span>
								<span>|</span>
							</>
						)}
						<div onClick={scrollToBottom} style={{ cursor: "pointer" }}>
							Page{" "}
							<span>
								{resultsPage.total_pages === 0
									? "0"
									: `${resultsPage.current_page}`}{" "}
								of {resultsPage.total_pages}
							</span>
						</div>
						<span>|</span>
						<div>
							Total Results: <span>{resultsPage.total_hits} </span>
						</div>
						<span>|</span>
						<div>
							Search Time: <span>{resultsPage.search_time / 1000} sec</span>
						</div>
					</div>
					{appliedFilters && (
						<div className={styles.doc_filter}>
							<span>Filters: </span>
							{appliedFilters}
						</div>
					)}
				</header>

				{isLoading ? (
					<div className={styles.docs_list}>
						{[...Array(10)].map((_, index) => (
							<SkeletonDoc key={index} />
						))}
					</div>
				) : resultsPage.results.length > 0 ? (
					<div className={styles.docs_list}>
						{resultsPage.results.map(doc => (
							<Doc key={doc.id} doc={doc} />
						))}
					</div>
				) : (
					<span className={styles.docs_message}>
						<SearchErrorIcon className={styles.icon} />
						There are no results for this search
					</span>
				)}

				{resultsPage.results.length > 0 && resultsPage.total_pages > 1 && (
					<Pagination
						page={resultsPage.current_page}
						changePage={setPage}
						pages={resultsPage.total_pages}
					/>
				)}
			</div>
		</>
	);
}

export default DocsContainer;
