import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HTTPExceptionDTO } from 'common/contracts/api/response/error.contracts';
import { APIError } from 'common/models/response/api/api-error.model';
import { stringifyURL } from 'common/utils/api.utils';
import { omitEmpty } from 'common/utils/global.utils';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
});

export { api };

/**
 * Handles the HTTP exception and builds it as a domain error.
 * @param error - Raw HTTP exception.
 * @returns Domain API error.
 */
export const buildDomainError = (error: any): APIError => {
	if (!(error instanceof AxiosError) || !error.response?.data) {
		return new APIError({
			status_code: 500,
		});
	}
	const errorData = error.response?.data as HTTPExceptionDTO;
	return new APIError(errorData);
};

/**
 * Checks if the given value is instance of our domain error.
 * @param value - Any value.
 * @returns Boolean indicating if the given value is instance of our domain error.
 */
export const isDomainError = (value: any): value is APIError => {
	return value instanceof APIError;
};

/**
 * A fetchen function used for the SWR hooks.
 * @param {string} endpoint - API Endpoint to query.
 * @param {AxiosRequestConfig} config - API request configuration.
 * @returns Axios response.
 */
export const fetcher = async (
	endpoint: string,
	config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
	return api.get(endpoint, config);
};

/**
 * Stringifies the request params.
 * @param {string} route - Route endpoint.
 * @param {Record<string, any>} params - Data to add to query params.
 * @returns Stringified url.
 */
export const buildRoute = (
	route: string,
	params: Record<string, any>
): string => {
	return stringifyURL(route, omitEmpty(params));
};
