import styles from "./Pagination.module.css";

interface PageButtonProps {
	pageNumber: number;
	currentPage: number;
	onClick: (pageNumber: number) => void;
}

function PageButton({ pageNumber, currentPage, onClick }: PageButtonProps) {
	const handleClick = () => {
		onClick(pageNumber);
	};

	const pageSelectedClass = `${styles.page} ${styles.selected}`;
	const pageClass = pageNumber === currentPage ? pageSelectedClass : styles.page;
	return (
		<button type="button" className={pageClass} onClick={handleClick}>
			{pageNumber}
		</button>
	);
}

export default PageButton;
