import { API_ENDPOINTS } from 'common/constants/api.constants';
import { api } from '../config';
import {
	CreateEmployee,
	UpdateEmployee,
} from 'common/contracts/api/payload/employee';
import { EmployeeResponseDTO } from 'common/contracts/api/response/employee';
import { Employee } from 'common/contracts/employee';

//export const getAllEmployeesAPI = () => {
//	try {
//		return api
//			.get(API_ENDPOINTS.EMPLOYEES.INDEX+1)
//			.then((response) => response.data);
//	} catch (error) {
//		return error;
//	}
//};
export const getAllEmployeesAPI = async (): Promise<EmployeeResponseDTO> => {
	const response = await api.get(API_ENDPOINTS.EMPLOYEES.INDEX);
	const data = response.data as EmployeeResponseDTO;
	return data;
};

export const getEmployeeByIdAPI = async (
	employeeId: string
): Promise<Employee> => {
	const response = await api.get(API_ENDPOINTS.EMPLOYEES.ID + employeeId);
	const data = response.data as Employee;
	return data;
};
export const getDeletedEmployeesAPI =
	async (): Promise<EmployeeResponseDTO> => {
		const response = await api.get(API_ENDPOINTS.EMPLOYEES.DELETED);
		const data = response.data as EmployeeResponseDTO;
		return data;
	};

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

export const createEmployeeAPI = async (data: CreateEmployee) => {
	try {
		const response = await api.post(API_ENDPOINTS.EMPLOYEES.INDEX, data);
		console.log('da li si u response');
		return response;
	} catch (error) {
		console.log('da li si u error');
		return error;
	}
};
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
