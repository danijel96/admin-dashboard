import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMedia } from 'react-use';

// internal imports
import { QUERY_KEYS } from 'common/constants/api.constants';
import { BREAKPOINTS } from 'common/constants/global.constants';
import { ROUTES } from 'common/constants/routes';
import { CreateEmployee } from 'common/contracts/api/payload/employee';
import { ResponseErrorDTO } from 'common/contracts/api/response/error.contracts';
import {
	editEmployeeAPI,
	getEmployeeByIdAPI,
} from 'common/services/api/employees';
import { BackButton } from 'components/Atoms/BackButton';
import { SpinnerLoader } from 'components/Atoms/SpinnerLoader';
import { EmployeeForm } from 'components/Employee/EmployeeForm';
import { MainLayout } from 'components/Layout/MainLayout';

const EditEmployee: NextPage = () => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true);

	const router = useRouter();

	const [employeeId] = useState(router.asPath.split('=')[1]);

	const employeesQuery = useQuery({
		queryKey: [QUERY_KEYS.EMPLOYEES, employeeId],
		enabled: !!employeeId,
		queryFn: () => getEmployeeByIdAPI(employeeId),
	});

	const queryClient = useQueryClient();

	const updateEmployeeMutation = useMutation({
		mutationFn: editEmployeeAPI,
	});

	const editEmployee: SubmitHandler<CreateEmployee> = async (
		formData: CreateEmployee
	) => {
		updateEmployeeMutation.mutate(
			{
				...formData,
				_id: employeeId,
			},
			{
				onSuccess() {
					toast.success('Successfully edited employee!', {
						id: 'editEmployee',
					});
					queryClient.invalidateQueries([QUERY_KEYS.EMPLOYEES]);
					router.push(ROUTES.HOME);
				},
				onError(error) {
					const axiosError = error as AxiosError<ResponseErrorDTO>;
					const errorMessage =
						axiosError.response?.data.message ?? 'Unknown error occurred';
					toast.error(errorMessage, {
						id: 'editEmployeeError',
					});
				},
			}
		);
	};
	console.log(employeesQuery, 'employeesQuery');

	return (
		<MainLayout
			wrapperClassName="edit-employee-page"
			headTitle="Edit Employee"
		>
			<div className="flex justify-center relative py-2">
				<BackButton className="absolute left-0" />
				<p className="text-center text-xl  font-bold text-yellow-500">
					Edit Employee
				</p>
			</div>
			{employeesQuery.data?._id ? (
				<EmployeeForm
					onSubmit={(data) => editEmployee(data)}
					initialData={employeesQuery.data}
				/>
			) : (
				<SpinnerLoader />
			)}
		</MainLayout>
	);
};

export default EditEmployee;
