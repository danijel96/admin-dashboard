import axios, { AxiosError } from 'axios';
import { HTTPExceptionDTO } from 'common/contracts/api/response/error.contracts';
import { APIError } from 'common/models/response/api/api-error.model';

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
