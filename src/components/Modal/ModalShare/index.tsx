import Button from "@components/Button";
import { Input, InputsWrapper } from "@components/FormField";
import { ModalContainer, ModalHeader, ModalProps } from "@components/Modal/Templates";
import { shareDoc } from "@http/Share";
import { IResult } from "@interfaces/IResult";
import { IShare } from "@interfaces/IShare";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiShare as ShareIcon } from "react-icons/bi";
import { toast } from "sonner";
import styles from "./ModalShare.module.css";

const EMAIL_KEY = "user_email";

interface ModalShareProps extends ModalProps {
	docs: IResult[];
	title?: string;
}
function ModalShare({ open, onClose, title, docs }: ModalShareProps) {
	const [email, setEmail] = useState("");

	useEffect(() => {
		const savedEmail = localStorage.getItem(EMAIL_KEY);
		if (savedEmail) {
			setEmail(savedEmail);
		}
	}, [docs]);

	const { mutateAsync: requestShareDoc, isPending } = useMutation({
		mutationFn: (share: IShare) => shareDoc(share),
		onSuccess: res => {
			toast.success(res);
		},
		onError: err => {
			toast.error(err.message);
		}
	});

	const handleShareDoc = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email || docs.length <= 0) return;
		const share: IShare = {
			receiver: email,
			results: docs
		};
		await requestShareDoc(share);
		localStorage.setItem(EMAIL_KEY, email);
		onClose();
	};

	return (
		<ModalContainer open={open} size="normal">
			<ModalHeader title={title || "Share Document"} onClose={onClose} />
			<form className={styles.share_form} onSubmit={handleShareDoc}>
				<InputsWrapper>
					<Input
						label="Email:"
						type="email"
						value={email}
						onChange={(value: string) => setEmail(value)}
						required
					/>
				</InputsWrapper>
				<footer className={styles.form_footer}>
					<Button
						type="submit"
						icon={ShareIcon}
						iconPosition="left"
						isLoading={isPending}
					>
						Share
					</Button>
				</footer>
			</form>
		</ModalContainer>
	);
}

export default ModalShare;
