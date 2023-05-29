/**
 * Function which returns this year.
 * @returns Current year in number type.
 */
export const currentYear = (): number => {
	const date = new Date();
	return date.getFullYear();
};

/**
 * Handling backend dates to local client date format.
 * @param date string
 * @returns Formatted date in locale format.
 */
export const formatDate = (date: string): string => {
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	};
	return new Date(date).toLocaleDateString(undefined, options);
};
/**
 * Handling backend dates to local client date & time format.
 * @param date string
 * @returns Formatted date in locale format with hours and minutes (Jan 01, 10:00).
 */
export const formatDateTime = (date: string): string => {
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	};
	return new Date(date).toLocaleTimeString(undefined, options);
};
