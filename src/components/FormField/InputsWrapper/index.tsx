import styles from "./InputsWrapper.module.css";

interface InputsWrapperProps {
	children: React.ReactNode;
}
function InputsWrapper({ children }: InputsWrapperProps) {
	return <div className={styles.inputs}>{children}</div>;
}

export default InputsWrapper;
