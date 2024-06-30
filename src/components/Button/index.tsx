import { IconType } from "react-icons";
import styles from "./Button.module.css";

interface ButtonProps {
	children: React.ReactNode;
	type?: "submit" | "reset" | "button" | undefined;
	variant?: "main" | "alt";
	onClick?: () => void;
	icon?: IconType;
	iconPosition?: "left" | "right";
	isLoading?: boolean;
}
function Button({
	onClick,
	children,
	variant = "main",
	icon: Icon,
	iconPosition = "right",
	isLoading = false,
	type = "button"
}: ButtonProps) {
	const buttonVariant = `${styles.button} ${styles[variant]}`;
	return (
		<>
			<button type={type} className={buttonVariant} onClick={onClick} disabled={isLoading}>
				{iconPosition === "left" && Icon && <Icon className={styles.icon} />}
				{!isLoading ? children : "Loading..."}
				{iconPosition === "right" && Icon && <Icon className={styles.icon} />}
			</button>
		</>
	);
}

export default Button;
