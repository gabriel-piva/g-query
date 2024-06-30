import Button from "@components/Button";
import { BiSearchAlt as HomeIcon, BiRefresh as RefreshIcon } from "react-icons/bi";
import { MdOutlineSearchOff as ErrorIcon } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorMessage.module.css";

function ErrorMessage() {
	const navigate = useNavigate();

	return (
		<div className={styles.error_container}>
			<div className={styles.error}>
				<ErrorIcon className={styles.icon} />
				<span className={styles.message}>An error occurred in your search.</span>
				<div className={styles.buttons}>
					<Button
						variant="alt"
						icon={RefreshIcon}
						iconPosition="left"
						onClick={() => location.reload()}
					>
						Refresh
					</Button>
					<Button
						variant="alt"
						iconPosition="left"
						icon={HomeIcon}
						onClick={() => navigate("/")}
					>
						Home
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ErrorMessage;
