import styles from "@components/Modal/Modal.module.css";
import { Overlay } from "@components/Modal/Templates";

interface ModalContainerProps {
	children: React.ReactNode;
	open: boolean;
	size?: "normal" | "large" | "small";
}
function ModalContainer({ children, open, size = "normal" }: ModalContainerProps) {
	const modal_class = `${styles.modal_container} ${styles[size]}`;
	return (
		<>
			{open && (
				<Overlay>
					<dialog className={modal_class} open={open}>
						{children}
					</dialog>
				</Overlay>
			)}
		</>
	);
}

export default ModalContainer;
