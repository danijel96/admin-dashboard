import {
	UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMedia } from 'react-use';

// internal imports
import { BREAKPOINTS } from 'common/constants/global.contants';
import { CreateEmployee } from 'common/contracts/api/payload/employee';
import { Employee } from 'common/contracts/employee';
import {
	editEmployeeAPI,
	getEmployeeByIdAPI,
} from 'common/services/api/hooks/getAllEmployees';
import { BackButton } from 'components/Atoms/BackButton';
import { EmployeeForm } from 'components/Employee/EmployeeForm';
import { MainLayout } from 'components/Layout/MainLayout';

const EditEmployee: NextPage = () => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true);

	const router = useRouter();

	const [employeeId, setEmployeeId] = useState('');
	const [employee, setEmployee] = useState<CreateEmployee | undefined>(
		undefined
	);

	const employeesQuery: UseQueryResult<Employee> = useQuery({
		queryKey: ['employees', employeeId],
		enabled: !!employeeId,
		queryFn: () => getEmployeeByIdAPI(employeeId),
		onSuccess(data) {
			setEmployee(data);
		},
	});

	const queryClient = useQueryClient();

	const updateEmployeeMutation = useMutation({
		mutationFn: editEmployeeAPI,
		onSuccess(data) {
			router.back();
		},
	});

	useEffect(() => {
		if (
			router.query?.employeeId &&
			typeof router.query?.employeeId === 'string'
		) {
			const employeeId = router.query.employeeId;
			setEmployeeId(employeeId);
		}
	}, [router]);

	const editEmployee: SubmitHandler<CreateEmployee> = async (
		formData: CreateEmployee
	) => {
		updateEmployeeMutation.mutate({
			...formData,
			_id: employeeId,
		});
	};

	return (
		<MainLayout wrapperClassName="edit-employee-page">
			<div className="flex justify-center relative py-2">
				<BackButton className="absolute left-0" />
				<p className="text-center text-xl  font-bold text-yellow-500">
					Edit Employee
				</p>
			</div>
			{employee && (
				<EmployeeForm
					onSubmit={(data) => editEmployee(data)}
					initialData={employee}
				/>
			)}
		</MainLayout>
	);
};

export default EditEmployee;
