export interface HTTPExceptionDTO {
	status_code: number;
	timestamp?: Date;
	error_code?: string;
	error_message?: string;
	errors?: Record<string, string>;
	details?: string;
}
