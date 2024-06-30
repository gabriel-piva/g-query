import Button from "@components/Button";
import { Input, InputsWrapper, Select, SelectOption } from "@components/FormField";
import { ModalContainer, ModalHeader, ModalProps } from "@components/Modal/Templates";
import { getCurrentDate } from "@services/date";
import { BiRefresh as ClearIcon, BiFilter as FilterIcon } from "react-icons/bi";
import { toast } from "sonner";
import styles from "./ModalFilter.module.css";

interface IFilterFormData {
	filterReadingTime: boolean;
	filterMinValue: string;
	filterMaxValue: string;
	filterDateCreation: boolean;
	filterMinDate: string;
	filterMaxDate: string;
	sortByReadingTime: string;
	sortByDateCreation: string;
}
interface ModalFilter extends ModalProps {
	filter: IFilterFormData;
	setFilter: React.Dispatch<React.SetStateAction<IFilterFormData>>;
	onSearch: () => void;
	isLoading?: boolean;
}
function ModalFilter({
	filter,
	setFilter,
	onSearch,
	open,
	onClose,
	isLoading = false
}: ModalFilter) {
	const order_date_options: SelectOption[] = [
		{ value: "asc", label: "Ascending" },
		{ value: "desc", label: "Descending" }
	];
	const order_reading_options: SelectOption[] = [
		{ value: "asc", label: "Shortest" },
		{ value: "desc", label: "Longest" }
	];

	const clearFilters = () => {
		setFilter({
			filterReadingTime: false,
			filterMinValue: "",
			filterMaxValue: "",
			filterDateCreation: false,
			filterMinDate: "",
			filterMaxDate: "",
			sortByReadingTime: "",
			sortByDateCreation: ""
		});
	};

	const handleSubmitFilter = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			filter.filterMinDate &&
			filter.filterMaxDate &&
			filter.filterMinDate > filter.filterMaxDate
		) {
			toast.warning("Minimum date cannot be greater than maximum date.");
			return;
		}
		if (
			filter.filterMinValue &&
			filter.filterMaxValue &&
			parseInt(filter.filterMinValue) > parseInt(filter.filterMaxValue)
		) {
			toast.warning("Minimum reading time cannot be greater than maximum reading time.");
			return;
		}
		onSearch();
		onClose();
	};

	return (
		<ModalContainer open={open} size="normal">
			<ModalHeader title="Filter Search" onClose={onClose} />
			<form className={styles.filter_form} onSubmit={handleSubmitFilter}>
				<InputsWrapper>
					<Input
						label="Min Date:"
						type="date"
						value={filter.filterMinDate}
						onChange={(value: string) => {
							setFilter(prev => ({
								...prev,
								filterMinDate: value
							}));
						}}
						max={getCurrentDate()}
						min={"1980-01-01"}
					/>
					<Input
						label="Max Date:"
						type="date"
						value={filter.filterMaxDate}
						onChange={(value: string) => {
							setFilter(prev => ({
								...prev,
								filterMaxDate: value
							}));
						}}
						max={getCurrentDate()}
						min={"1980-01-01"}
					/>
					<Input
						label="Min Reading Time (min):"
						type="number"
						value={filter.filterMinValue}
						min="1"
						step="1"
						onChange={(value: string) => {
							setFilter(prev => ({
								...prev,
								filterMinValue: value
							}));
						}}
					/>
					<Input
						label="Max Reading Time (min):"
						type="number"
						value={filter.filterMaxValue}
						min="1"
						step="1"
						onChange={(value: string) => {
							setFilter(prev => ({
								...prev,
								filterMaxValue: value
							}));
						}}
					/>
					<Select
						label="Order by Date:"
						value={filter.sortByDateCreation}
						onChange={(value: string) => {
							setFilter(prev => ({
								...prev,
								sortByDateCreation: value
							}));
						}}
						options={order_date_options}
					/>
					<Select
						label="Order by Reading Time:"
						value={filter.sortByReadingTime}
						onChange={(value: string) => {
							setFilter(prev => ({
								...prev,
								sortByReadingTime: value
							}));
						}}
						options={order_reading_options}
					/>
				</InputsWrapper>
				<footer className={styles.form_footer}>
					<Button
						icon={ClearIcon}
						iconPosition="left"
						variant="alt"
						onClick={clearFilters}
					>
						Clear
					</Button>
					<Button
						type="submit"
						icon={FilterIcon}
						iconPosition="left"
						isLoading={isLoading}
					>
						Filter
					</Button>
				</footer>
			</form>
		</ModalContainer>
	);
}

export default ModalFilter;
