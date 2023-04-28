/**
 * Function which returns this year.
 * @returns Current year in number type.
 */
export const currentYear = (): number => {
	const date = new Date();
	return date.getFullYear();
};
