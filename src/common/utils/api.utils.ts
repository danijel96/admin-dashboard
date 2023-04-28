/**
 * Stringifies URL and the given query parameters.
 * @param {string} url - Base URL
 * @param {any} query - Query parameters.
 * @returns Stringified URL.
 */
export const stringifyURL = (url: string, query: any): string => {
	if (!query) return url;

	const queryParams = Object.keys(query).map((key: string) =>
		Array.isArray(query[key])
			? buildQueryParamsFromArray(key, query[key])
			: `${key}=${query[key]}`
	);
	const queryString = queryParams.join('&');
	return `${url}?${queryString}`;
};

/**
 * Appends query paramaters of the given key to the query string.
 * @param {string} key - Query string.
 * @param {any[]} queryParam - Query param value.
 * @returns Formatter query string.
 */
const buildQueryParamsFromArray = (key: string, queryParam: any[]): string => {
	if (queryParam.length === 1) {
		return `${key}[]=${queryParam[0]}`;
	}
	return queryParam.map((item) => `${key}=${item}`).join('&');
};
