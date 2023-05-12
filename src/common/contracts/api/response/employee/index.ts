import { Employee } from 'common/contracts/employee';

export interface EmployeeResponseDTO {
	count: number;
	employees: Employee[];
}
