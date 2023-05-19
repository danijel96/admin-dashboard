import { Employee } from 'common/contracts/employee';

export interface EmployeeResponseDTO {
	totalResults: number;
	totalPages: number;
	currentPage: number;
	data: Employee[];
}
