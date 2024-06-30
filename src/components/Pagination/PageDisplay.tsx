import PageButton from "./PageButton";
import styles from "./Pagination.module.css";

interface PagesDisplayProps {
	current: number;
	totalPages: number;
	onPageChange: (newPage: number) => void;
}
function PagesDisplay({ current, totalPages, onPageChange }: PagesDisplayProps) {
	const generateNumberArray = (start: number, end: number) =>
		[...Array(end - start + 1).keys()].map(i => i + start);

	if (totalPages <= 5) {
		return (
			<div className={styles.pages_display}>
				{generateNumberArray(1, totalPages).map(n => (
					<PageButton
						key={n}
						currentPage={current}
						pageNumber={n}
						onClick={onPageChange}
					/>
				))}
			</div>
		);
	}

	if (current <= 3) {
		return (
			<div className={styles.pages_display}>
				{generateNumberArray(1, 3).map(n => (
					<PageButton
						key={n}
						currentPage={current}
						pageNumber={n}
						onClick={onPageChange}
					/>
				))}
				<span className={styles.ellipsis}>...</span>
				<PageButton pageNumber={totalPages} currentPage={current} onClick={onPageChange} />
			</div>
		);
	}

	if (current > 3 && current <= totalPages - 3) {
		return (
			<div className={styles.pages_display}>
				<PageButton pageNumber={1} currentPage={current} onClick={onPageChange} />
				<span className={styles.ellipsis}>...</span>
				{generateNumberArray(current - 1, current + 1).map(n => (
					<PageButton
						key={n}
						pageNumber={n}
						currentPage={current}
						onClick={onPageChange}
					/>
				))}
				<span className={styles.ellipsis}>...</span>
				<PageButton pageNumber={totalPages} currentPage={current} onClick={onPageChange} />
			</div>
		);
	}

	return (
		<div className={styles.pages_display}>
			<PageButton pageNumber={1} currentPage={current} onClick={onPageChange} />
			<span className={styles.ellipsis}>...</span>
			{generateNumberArray(totalPages - 2, totalPages).map(n => (
				<PageButton key={n} pageNumber={n} currentPage={current} onClick={onPageChange} />
			))}
		</div>
	);
}

export default PagesDisplay;
