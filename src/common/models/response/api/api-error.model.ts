// Contracts
import { HTTPExceptionDTO } from 'common/contracts/api/response/error.contracts';
import { DEFAULT_ERROR_MESSAGE } from 'common/constants/api.constants';

export class APIError {
	statusCode: number;
	errorMessage: string;
	timestamp?: Date;
	errorCode?: string;
	errors?: Record<string, string>;
	details?: string;

	constructor(error: HTTPExceptionDTO) {
		this.statusCode = error.status_code;
		this.timestamp = error.timestamp || new Date();
		this.errorCode = error.error_code;
		this.errorMessage = error.error_message || DEFAULT_ERROR_MESSAGE;
		this.errors = error.errors;
		this.details = error.details;
	}
}
