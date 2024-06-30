import { useEffect, useState } from "react";
import {
	BiFilter as FilterIcon,
	BiMicrophone as MicIcon,
	BiMicrophoneOff as MicOffIcon,
	BiSearch as SearchIcon
} from "react-icons/bi";
import { toast } from "sonner";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
	value: string;
	placeholder: string;
	onChange: (value: string) => void;
	onSearch: () => void;
	onFilter?: () => void;
	size?: "normal" | "full";
}
function SearchBar({
	value,
	onChange,
	placeholder,
	onSearch,
	size = "normal",
	onFilter
}: SearchBarProps) {
	const [isListening, setIsListening] = useState(false);
	const [isSupported, setIsSupported] = useState(true);

	useEffect(() => {
		const SpeechRecognition =
			(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		if (!SpeechRecognition) {
			setIsSupported(false);
		}
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") onSearch();
	};

	const SpeechRecognition =
		(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

	const recognition = new SpeechRecognition();
	recognition.lang = "en-US";
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;

	const startListening = () => {
		setIsListening(true);
		recognition.start();
	};
	const stopListening = () => {
		setIsListening(false);
		recognition.stop();
	};
	recognition.onresult = (event: any) => {
		const transcript = event.results[0][0].transcript;
		onChange(transcript);
		setIsListening(false);
	};
	recognition.onerror = () => {
		toast.error("Erro no reconhecimento de fala.");
		setIsListening(false);
	};

	const searchClass = size === "normal" ? styles.search : `${styles.search} ${styles.full}`;
	return (
		<div className={styles.search_wrapper}>
			<label className={searchClass}>
				<input
					className={styles.search_input}
					type="search"
					value={value}
					placeholder={placeholder}
					autoFocus={true}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					spellCheck={false}
				/>

				<button className={styles.search_button} type="button">
					<SearchIcon className={styles.search_icon} onClick={onSearch} />
				</button>
			</label>
			{isSupported &&
				(isListening ? (
					<button className={styles.out_button} type="button" onClick={stopListening}>
						<MicOffIcon className={styles.mic_off_icon} />
					</button>
				) : (
					<button className={styles.out_button} type="button" onClick={startListening}>
						<MicIcon className={styles.out_icon} />
					</button>
				))}
			{size === "full" && (
				<button className={styles.out_button} type="button" onClick={onFilter}>
					<FilterIcon className={styles.out_icon} />
				</button>
			)}
		</div>
	);
}

export default SearchBar;
