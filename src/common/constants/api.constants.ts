export const DEFAULT_ERROR_MESSAGE = 'Something went wrong.';

export const DEFAULT_PAGE_SIZE_LIMIT = 2;

export const QUERY_KEYS = {
	EMPLOYEES: 'employees',
	DELETED_EMPLOYEES: 'deleted-employees',
};

export const API_ENDPOINTS = {
	EMPLOYEES: {
		INDEX: '/employees',
		ID: '/employees/id/',
		NAME: '/employees/name/',
		DELETED: '/employees/deleted',
		SOFT_DELETE: '/employees/soft-delete/',
		PERMANENT_DELETE: '/employees/permanent-delete/',
	},
};
