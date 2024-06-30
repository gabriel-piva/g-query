import { createFavorite, deleteFavorite } from "@http/Favorite";
import { IResult } from "@interfaces/IResult";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
	BiVolumeMute as CancelSpeakerIcon,
	BiSolidHeart as FavIcon,
	BiHeart as NoFavIcon,
	BiShare as ShareIcon,
	BiVolumeFull as SpeakerIcon,
	BiLogoWikipedia as WikiIcon
} from "react-icons/bi";
import { toast } from "sonner";
import { ModalLoading, ModalShare } from "../Modal";
import ModalDoc from "../Modal/ModalDoc";
import styles from "./Doc.module.css";

interface DocProps {
	doc: IResult;
}
function Doc({ doc }: DocProps) {
	// DOC -------------------------------
	const [modalDocOpen, setModalDocOpen] = useState(false);
	const toggleModalDoc = () => setModalDocOpen(!modalDocOpen);

	// SHARE -------------------------------
	const [modalShareOpen, setModalShareOpen] = useState(false);
	const toggleModalShare = () => setModalShareOpen(!modalShareOpen);

	// FAVORITE ----------------------------
	const [isFavorite, setIsFavorite] = useState(doc.isFavorite);
	const queryClient = useQueryClient();
	const { mutateAsync: addFavorite, isPending: loadAddFav } = useMutation({
		mutationFn: () => createFavorite(doc.id),
		onSuccess: res => {
			setIsFavorite(true);
			queryClient.invalidateQueries({ queryKey: ["search"] });
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
			toast.success(res);
		},
		onError: err => {
			toast.error(err.message);
		}
	});
	const { mutateAsync: removeFavorite, isPending: loadRemFav } = useMutation({
		mutationFn: () => deleteFavorite(doc.id),
		onSuccess: res => {
			setIsFavorite(false);
			queryClient.invalidateQueries({ queryKey: ["search"] });
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
			toast.success(res);
		},
		onError: err => {
			toast.error(err.message);
		}
	});
	const handleToggleFavorite = async () => {
		if (isFavorite) {
			await removeFavorite();
		} else {
			await addFavorite();
		}
	};

	// TEXT TO SPEECH ----------------------
	const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const handleReadAloud = () => {
		if (isSpeaking) {
			speechSynthesis.cancel();
			setIsSpeaking(false);
		} else {
			const textChunks = splitTextIntoChunks(`${doc.title}. ${doc.abs}`);
			if (textChunks.length > 0) {
				speakTextChunks(textChunks);
			}
		}
	};
	const splitTextIntoChunks = (text: string) => {
		const maxChunkLength = 200;
		const chunks = [];
		for (let i = 0; i < text.length; i += maxChunkLength) {
			chunks.push(text.slice(i, i + maxChunkLength));
		}
		return chunks;
	};
	const speakTextChunks = (chunks: string[]) => {
		setIsSpeaking(true);
		let currentIndex = 0;
		const speakNextChunk = () => {
			if (currentIndex < chunks.length) {
				if (!speechUtteranceRef.current) {
					speechUtteranceRef.current = new SpeechSynthesisUtterance();
					speechUtteranceRef.current.lang = "en-US";
				}
				speechUtteranceRef.current.text = chunks[currentIndex];
				speechUtteranceRef.current.onend = () => {
					currentIndex++;
					speakNextChunk();
				};

				speechSynthesis.speak(speechUtteranceRef.current);
			} else {
				setIsSpeaking(false);
			}
		};
		speakNextChunk();
	};

	// -------------------------------------

	return (
		<>
			<div className={styles.doc}>
				<header className={styles.doc_header}>
					<div className={styles.doc_display}>
						<WikiIcon className={styles.icon} />
						<div className={styles.title_url}>
							<a
								href={doc.url}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.title}
							>
								{doc.title}
							</a>
							<a
								href={doc.url}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.url}
							>
								{doc.url.split("//").at(1)}
							</a>
						</div>
					</div>
					<div className={styles.doc_actions}>
						<button type="button" className={styles.action} onClick={toggleModalShare}>
							<ShareIcon />
						</button>
						<button
							type="button"
							className={styles.action}
							onClick={handleToggleFavorite}
						>
							{isFavorite ? <FavIcon /> : <NoFavIcon />}
						</button>
						<button type="button" className={styles.action} onClick={handleReadAloud}>
							{isSpeaking ? (
								<CancelSpeakerIcon className={isSpeaking ? styles.speaking : ""} />
							) : (
								<SpeakerIcon />
							)}
						</button>
						<button type="button" className={styles.action} onClick={toggleModalDoc}>
							<WikiIcon />
						</button>
					</div>
				</header>

				{doc.highlight ? (
					<div
						className={styles.doc_abstract}
						dangerouslySetInnerHTML={{ __html: doc.highlight }}
					/>
				) : (
					<div className={styles.doc_abstract}>{doc.abs}</div>
				)}

				<div className={styles.doc_details}>
					<span>Reading Time: {doc.reading_time} min</span>
					<span>|</span>
					<span>Date Created: {doc.date_creation}</span>
				</div>
			</div>
			<ModalShare open={modalShareOpen} onClose={toggleModalShare} docs={[doc]} />
			<ModalLoading open={loadAddFav || loadRemFav} onClose={() => {}} />
			<ModalDoc open={modalDocOpen} onClose={toggleModalDoc} doc={doc} />
		</>
	);
}

export default Doc;
