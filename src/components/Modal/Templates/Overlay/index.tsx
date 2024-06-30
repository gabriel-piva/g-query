import styles from "@components/Modal/Modal.module.css";

interface OverlayProps {
	children: React.ReactNode;
}
function Overlay({ children }: OverlayProps) {
	return (
		<>
			<div className={styles.overlay}>{children}</div>
		</>
	);
}

export default Overlay;
