function getCurrentDate() {
	return new Date().toISOString().split("T")[0];
}
const convertDateToISO = (date: string) => {
	const [day, month, year] = date.split("/");
	return new Date(`${year}-${month}-${day}`).toJSON();
};

export { convertDateToISO, getCurrentDate };
