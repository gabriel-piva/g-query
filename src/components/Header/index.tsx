import { useEffect, useState } from "react";
import {
	BiHeart as HeartIcon,
	BiSearchAlt as LogoIcon,
	BiMoon as MoonIcon,
	BiSun as SunIcon
} from "react-icons/bi";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
	const [theme, setTheme] = useState("dark");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setTheme(savedTheme);
			document.documentElement.setAttribute("data-theme", savedTheme);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.container}>
					<Link to={"/"} className={styles.logo}>
						<LogoIcon className={styles.icon} />
						G-Query
					</Link>
					<nav className={styles.nav}>
						<button type="button" className={styles.action} onClick={toggleTheme}>
							{theme === "dark" ? (
								<SunIcon className={styles.icon} />
							) : (
								<MoonIcon className={styles.icon} />
							)}
						</button>
						<Link to="/favorites" className={styles.action}>
							<HeartIcon className={styles.icon} />
						</Link>
					</nav>
				</div>
			</header>
		</>
	);
}

export default Header;
