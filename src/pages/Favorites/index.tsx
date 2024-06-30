import DocsContainer from "@components/DocsContainer";
import SkeletonDocsContainer from "@components/DocsContainer/SkeletonContainer";
import ErrorMessage from "@components/ErrorMessage";
import { ModalShare } from "@components/Modal";
import { getFavorites } from "@http/Favorite";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BiShareAlt as ShareIcon } from "react-icons/bi";
import { LuFolderHeart as HeartIcon } from "react-icons/lu";
import styles from "./Favorites.module.css";

function Favorites() {
	const [modalShareOpen, setModalShareOpen] = useState(false);
	const toggleModalShare = () => setModalShareOpen(!modalShareOpen);

	const [page, setPage] = useState(1);
	const {
		data: favPage,
		isLoading,
		isError,
		isPlaceholderData
	} = useQuery({
		queryKey: ["favorites", page],
		queryFn: () => getFavorites(page),
		placeholderData: keepPreviousData
	});

	return (
		<>
			<header className={styles.fav_header}>
				<div className={styles.fav_title}>
					<HeartIcon />
					<span>Favorites</span>
				</div>
				<button type="button" onClick={toggleModalShare} className={styles.fav_share}>
					<ShareIcon />
				</button>
			</header>

			{isLoading && !isPlaceholderData ? (
				<SkeletonDocsContainer />
			) : (
				favPage !== undefined && (
					<DocsContainer
						resultsPage={favPage}
						setPage={setPage}
						isLoading={isPlaceholderData}
					/>
				)
			)}

			{isError && <ErrorMessage />}

			{favPage !== undefined && (
				<ModalShare
					title="Share Favorites Page"
					open={modalShareOpen}
					onClose={toggleModalShare}
					docs={favPage.results}
				/>
			)}
		</>
	);
}

export default Favorites;
