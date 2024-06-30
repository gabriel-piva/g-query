import SkeletonDoc from "@components/Doc/SkeletonDoc";
import { SkeletonTheme } from "react-loading-skeleton";
import styles from "./SkeletonContainer.module.css";

function SkeletonDocsContainer() {
	return (
		<SkeletonTheme baseColor="var(--gray1)" highlightColor="var(--text)">
			<div className={styles.skeleton_docs_container}>
				<div className={styles.skeleton_docs_list}>
					{Array.from({ length: 6 }).map((_, index) => (
						<SkeletonDoc key={index} />
					))}
				</div>
			</div>
		</SkeletonTheme>
	);
}

export default SkeletonDocsContainer;
