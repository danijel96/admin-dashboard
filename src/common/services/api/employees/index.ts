import { API_ENDPOINTS } from 'common/constants/api.constants';
import {
	CreateEmployee,
	UpdateEmployee,
} from 'common/contracts/api/payload/employee';
import { EmployeeResponseDTO } from 'common/contracts/api/response/employee';
import { Employee } from 'common/contracts/employee';
import { api } from '../config';
import { AxiosResponse } from 'axios';

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
export const softDeleteEmployeeAPI = async (
	employeeId: string
): Promise<Employee> => {
	const response = await api.delete(
		API_ENDPOINTS.EMPLOYEES.SOFT_DELETE + employeeId
	);
	const data = response.data as Employee;
	return data;
};

/**
 * Create employee.
 * @param {Object} dataPayload - CreateEmployee
 * @returns
 */
export const createEmployeeAPI = async (
	dataPayload: CreateEmployee
): Promise<Employee> => {
	const response = await api.post(API_ENDPOINTS.EMPLOYEES.INDEX, dataPayload);
	const data = response.data as Employee;
	return data;
};

/**
 * Edit employee.
 * @param {Object} dataPayload - UpdateEmployee
 * @returns
 */
export const editEmployeeAPI = async (
	dataPayload: UpdateEmployee
): Promise<Employee> => {
	const employeeId = dataPayload._id;
	const response = await api.patch(
		API_ENDPOINTS.EMPLOYEES.INDEX + '/' + employeeId,
		dataPayload
	);
	const data = response.data as Employee;
	return data;
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
export const permanentDeleteEmployeeAPI = async (
	employeeId: string
): Promise<Employee> => {
	const response = await api.delete(
		API_ENDPOINTS.EMPLOYEES.PERMANENT_DELETE + employeeId
	);
	const data = response.data as Employee;
	return data;
};
