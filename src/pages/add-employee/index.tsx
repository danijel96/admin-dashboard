import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { useMedia } from 'react-use';

// internal imports
import { BREAKPOINTS } from 'common/constants/global.contants';
import { CreateEmployee } from 'common/contracts/api/payload/employee';
import { createEmployeeAPI } from 'common/services/api/hooks/getAllEmployees';
import { BackButton } from 'components/Atoms/BackButton';
import { EmployeeForm } from 'components/Employee/EmployeeForm';
import { MainLayout } from 'components/Layout/MainLayout';

const AddEmployee: NextPage = () => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true);

	const router = useRouter();

	const queryClient = useQueryClient();

	const createEmployeeMutation = useMutation({
		mutationFn: createEmployeeAPI,
	});

	const createEmployee: SubmitHandler<CreateEmployee> = async (
		formData: CreateEmployee
	) => {
		const response = createEmployeeMutation.mutate(formData);
	};

	return (
		<MainLayout wrapperClassName="add-employee-page">
			<div className="flex justify-center relative py-2">
				<BackButton className="absolute left-0" />
				<p className="text-center text-xl  font-bold text-blue-600">
					Add Employee
				</p>
			</div>
			<EmployeeForm onSubmit={(data) => createEmployee(data)} />
		</MainLayout>
	);
};

export default AddEmployee;
