import { ModalContainer, ModalProps } from "@components/Modal/Templates";
import styles from "./ModalLoading.module.css";

function ModalLoading({ open }: ModalProps) {
	return (
		<ModalContainer open={open} size="small">
			<div className={styles.loader_wrapper}>
				<div className={styles.spinner}></div>
				<span className={styles.message}>Loading</span>
			</div>
		</ModalContainer>
	);
}

export default ModalLoading;
