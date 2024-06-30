import { SelectHTMLAttributes, useEffect } from "react";
import styles from "./Select.module.css";
import { SelectOption } from "./SelectOption";

interface CustomSelectProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
	required?: boolean;
}
type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "required"> &
	CustomSelectProps;

function Select({ label, value, onChange, options, required = false, ...rest }: SelectProps) {
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};

	useEffect(() => {
		if (required && value === "" && options.length > 0) {
			onChange(options[0].value);
		}
	}, [value, required, options]);

	return (
		<label className={styles.label}>
			<span className={styles.name}>{label}</span>
			<select
				className={styles.select}
				value={value}
				onChange={handleSelectChange}
				required={required}
				{...rest}
			>
				{!required && <option className={styles.option} value=""></option>}
				{options.map(option => (
					<option className={styles.option} key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
}

export default Select;
