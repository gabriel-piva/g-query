import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonDoc.module.css";

function SkeletonDoc() {
	return (
		<SkeletonTheme baseColor="var(--gray1)" highlightColor="var(--text)">
			<div className={styles.skeleton_doc}>
				<header className={styles.skeleton_doc_header}>
					<div className={styles.skeleton_doc_display}>
						<Skeleton className={styles.skeleton_icon} circle={true} />
						<div>
							<Skeleton width={180} />
							<Skeleton width={220} />
						</div>
					</div>
					<div className={styles.skeleton_doc_actions}>
						<Skeleton circle={true} width={28} height={28} />
						<Skeleton circle={true} width={28} height={28} />
						<Skeleton circle={true} width={28} height={28} />
					</div>
				</header>
				<Skeleton count={3} />
				<Skeleton className={styles.skeleton_details} width={200} />
			</div>
		</SkeletonTheme>
	);
}

export default SkeletonDoc;
