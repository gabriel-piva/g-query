import Button from "@components/Button";
import { ModalButtons, ModalContainer, ModalHeader, ModalProps } from "@components/Modal/Templates";
import { IResult } from "@interfaces/IResult";
import { BiX as CloseIcon, BiLinkExternal as LinkIcon } from "react-icons/bi";
import styles from "./ModalDoc.module.css";

interface ModalDocProps extends ModalProps {
	doc: IResult;
}
function ModalDoc({ open, onClose, doc }: ModalDocProps) {
	return (
		<ModalContainer open={open} size="large">
			<ModalHeader title={doc.title} onClose={onClose} />
			<div className={styles.doc_preview}>
				<iframe src={doc.url} title={doc.title} className={styles.frame} />
			</div>
			<ModalButtons>
				<Button variant="alt" iconPosition="left" icon={CloseIcon} onClick={onClose}>
					Close
				</Button>
				<a href={doc.url} target="_blank" rel="noopener noreferrer">
					<Button icon={LinkIcon}>Open</Button>
				</a>
			</ModalButtons>
		</ModalContainer>
	);
}

export default ModalDoc;
