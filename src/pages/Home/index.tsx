import Button from "@components/Button";
import SearchBar from "@components/SearchBar";
import { useState } from "react";
import { BiSearchAlt as LogoIcon, BiSearch as SearchIcon } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = () => {
		if (query) navigate(`/results?q=${query}`);
	};

	return (
		<div className={styles.container}>
			<span className={styles.logo}>
				<LogoIcon />
				G-Query
			</span>
			<div className={styles.search_wrapper}>
				<SearchBar
					value={query}
					placeholder="Search on G-Query"
					onChange={setQuery}
					onSearch={handleSearch}
				/>
				<Button variant="alt" icon={SearchIcon} iconPosition="left" onClick={handleSearch}>
					Search
				</Button>
			</div>
		</div>
	);
}

export default Home;
