import { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface CustomInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & CustomInputProps;

function Input({ label, value, onChange, type = "text", ...rest }: InputProps) {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<label className={styles.label}>
			<div className={styles.name}>
				{label}
				<span className={styles.required}>
					{rest.required && value.length === 0 && "*"}
				</span>
			</div>
			<input
				className={styles.input}
				value={value}
				onChange={handleInputChange}
				spellCheck={false}
				autoComplete="off"
				type={type}
				{...rest}
			/>
		</label>
	);
}

export default Input;
