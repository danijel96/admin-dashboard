import { Employee, EmployeeHomeAddress } from 'common/contracts/employee';

//export type CreateEmployee = Omit<Employee, '_id' | 'isDeleted' | 'deletedAt'>;

export type CreateEmployee = Omit<
	Employee,
	'_id' | 'isDeleted' | 'deletedAt'
> & { homeAddress: Omit<EmployeeHomeAddress, '_id'> };

export type UpdateEmployee = Omit<Employee, 'isDeleted' | 'deletedAt'> & {
	homeAddress: Omit<EmployeeHomeAddress, '_id'>;
};
