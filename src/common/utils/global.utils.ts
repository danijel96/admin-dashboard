/**
 * Omits the empty keys from the given object.
 * @param {Record<string, any>} object
 * @returns Object with keys that have values.
 */
export const omitEmpty = (object: Record<string, any>): Record<string, any> => {
	const filtered: any = {};
	Object.keys(object).forEach((key) => {
		if (object[key]) {
			if (Array.isArray(object[key]) && object[key].length === 0) {
				return;
			}
			filtered[key] = object[key];
		}
	});
	return filtered;
};
