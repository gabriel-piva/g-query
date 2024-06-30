import { useEffect, useState } from "react";
import { BiUpArrow as ArrowIcon } from "react-icons/bi";
import styles from "./Scroll.module.css";

function Scroll() {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<div className={styles.scroll_to_top}>
			{isVisible && (
				<button onClick={scrollToTop} className={styles.scroll_button}>
					<ArrowIcon />
				</button>
			)}
		</div>
	);
}

export default Scroll;
