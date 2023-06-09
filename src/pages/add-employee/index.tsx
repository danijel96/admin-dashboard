import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

// internal imports
import { QUERY_KEYS } from 'common/constants/api.constants';
import { ROUTES } from 'common/constants/routes';
import { CreateEmployee } from 'common/contracts/api/payload/employee';
import { ResponseErrorDTO } from 'common/contracts/api/response/error.contracts';
import { createEmployeeAPI } from 'common/services/api/employees';
import { BackButton } from 'components/Atoms/BackButton';
import { EmployeeForm } from 'components/Employee/EmployeeForm';
import { MainLayout } from 'components/Layout/MainLayout';

const AddEmployee: NextPage = () => {
	const router = useRouter();

	const queryClient = useQueryClient();

	const createEmployeeMutation = useMutation({
		mutationFn: createEmployeeAPI,
	});

	const createEmployee: SubmitHandler<CreateEmployee> = (
		formData: CreateEmployee
	) => {
		const data: CreateEmployee = {
			...formData,
			dateOfBirth: new Date(formData.dateOfBirth).toDateString(),
			dateOfEmployment: new Date(formData.dateOfEmployment).toDateString(),
		};
		createEmployeeMutation.mutate(data, {
			onSuccess() {
				toast.success('Successfully added employee!', {
					id: 'addEmployee',
				});
				queryClient.invalidateQueries([QUERY_KEYS.EMPLOYEES]);
				router.push(ROUTES.HOME);
			},
			onError(error) {
				const axiosError = error as AxiosError<ResponseErrorDTO>;
				const errorMessage =
					axiosError.response?.data.message ?? 'Unknown error occurred';
				toast.error(errorMessage, {
					id: 'addEmployeeError',
				});
			},
		});
	};

	return (
		<MainLayout
			wrapperClassName="add-employee-page"
			headTitle="Add Employee"
		>
			<div className="flex justify-center relative py-5">
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
