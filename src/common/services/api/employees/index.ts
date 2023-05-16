import { API_ENDPOINTS } from 'common/constants/api.constants';
import {
	CreateEmployee,
	UpdateEmployee,
} from 'common/contracts/api/payload/employee';
import { EmployeeResponseDTO } from 'common/contracts/api/response/employee';
import { Employee } from 'common/contracts/employee';
import { api } from '../config';

/**
 * Get all employees.
 * @returns EmployeeResponseDTO data
 */
export const getAllEmployeesAPI = async (): Promise<EmployeeResponseDTO> => {
	const response = await api.get(API_ENDPOINTS.EMPLOYEES.INDEX);
	const data = response.data as EmployeeResponseDTO;
	return data;
};

/**
 * Get one employee by provided ID.
 * @param {string} employeeId  - string
 * @returns Employee data
 */
export const getEmployeeByIdAPI = async (
	employeeId: string
): Promise<Employee> => {
	const response = await api.get(API_ENDPOINTS.EMPLOYEES.ID + employeeId);
	const data = response.data as Employee;
	return data;
};

/**
 * Soft delete employee with provided ID and send him to deleted-employees list.
 * @param {string} employeeId - string
 * @returns
 */
export const softDeleteEmployeeAPI = async (employeeId: string) => {
	try {
		const response = await api.delete(
			API_ENDPOINTS.EMPLOYEES.SOFT_DELETE + employeeId
		);
		return response;
	} catch (error) {
		return error;
	}
};

/**
 * Create employee.
 * @param {Object} data - CreateEmployee
 * @returns
 */
export const createEmployeeAPI = async (data: CreateEmployee) => {
	try {
		const response = await api.post(API_ENDPOINTS.EMPLOYEES.INDEX, data);
		return response;
	} catch (error) {
		return error;
	}
};

/**
 * Edit employee.
 * @param {Object} data - UpdateEmployee
 * @returns
 */
export const editEmployeeAPI = async (data: UpdateEmployee) => {
	const employeeId = data._id;
	try {
		const response = await api.patch(
			API_ENDPOINTS.EMPLOYEES.INDEX + '/' + employeeId,
			data
		);
		return response;
	} catch (error) {
		return error;
	}
};

/**
 * Get list of deleted employees.
 * @returns EmployeeResponseDTO
 */
export const getDeletedEmployeesAPI =
	async (): Promise<EmployeeResponseDTO> => {
		const response = await api.get(API_ENDPOINTS.EMPLOYEES.DELETED);
		const data = response.data as EmployeeResponseDTO;
		return data;
	};

/**
 * Permanent delete employee from deleted-employees with provided ID.
 * @param {string} employeeId - string
 */
export const permanentDeleteEmployeeAPI = async (employeeId: string) => {
	try {
		const response = await api.delete(
			API_ENDPOINTS.EMPLOYEES.PERMANENT_DELETE + employeeId
		);
		return response;
	} catch (error) {
		return error;
	}
};
