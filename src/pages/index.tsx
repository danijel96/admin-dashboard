import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMedia } from 'react-use';

// internal imports
import {
	DEFAULT_PAGE_SIZE_LIMIT,
	QUERY_KEYS,
} from 'common/constants/api.constants';
import { BREAKPOINTS } from 'common/constants/global.constants';
import { ROUTES } from 'common/constants/routes';
import { ResponseErrorDTO } from 'common/contracts/api/response/error.contracts';
import {
	getAllEmployeesAPI,
	softDeleteEmployeeAPI,
} from 'common/services/api/employees';
import { MainLayout } from 'components/Layout/MainLayout';
import { ModalTypes } from 'components/Modal/ModalTypes';
import { Pagination } from 'components/Pagination/Pagination';
import { Table } from 'components/Table/Table';
import { tableHeads } from 'common/constants/table.constants';

const Home: NextPage = () => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true); // true is defaultState parameter for ssr to avoid hydration error

	const router = useRouter();

	const [currentPage, setCurrentPage] = useState(1);
	const [employeeId, setEmployeeId] = useState('');
	const [deleteEmployeeModal, setDeleteEmployeeModal] = useState(false);

	const employeesQuery = useQuery({
		queryKey: [QUERY_KEYS.EMPLOYEES, { page: currentPage }],
		queryFn: () =>
			getAllEmployeesAPI({ limit: DEFAULT_PAGE_SIZE_LIMIT, page: currentPage }),
		retry: 1,
		refetchOnMount: true,
	});

	const deleteEmployeeMutation = useMutation({
		mutationFn: softDeleteEmployeeAPI,
	});

	const goToAddEmployee = () => {
		router.push(ROUTES.ADD_EMPLOYEE);
	};

	const handleEditEmployee = (id: string) => {
		router.push({
			pathname: ROUTES.EDIT_EMPLOYEE,
			query: { employeeId: id },
		});
	};
	const queryClient = useQueryClient();

	const handleDeleteEmployee = () => {
		deleteEmployeeMutation.mutate(employeeId, {
			onSuccess() {
				toast.success('Successfully deleted employee!', {
					id: 'deleteEmployee',
				});
				queryClient.invalidateQueries([QUERY_KEYS.EMPLOYEES]);
			},
			onError(error) {
				const axiosError = error as AxiosError<ResponseErrorDTO>;
				const errorMessage = axiosError?.message ?? 'Unknown error occurred';
				toast.error(errorMessage, {
					id: 'deleteEmployeeError',
				});
			},
		});
	};

	const toggleDeleteEmployeeModal = () => {
		setDeleteEmployeeModal(!deleteEmployeeModal);
	};

	console.log(employeesQuery.data?.data, 'employeesQuery.data?.employees');
	console.log(employeesQuery.data, 'employeesQuery.data');

	return (
		<MainLayout
			wrapperClassName="employees-page min-w-[320px] bg-white"
			headTitle="Employees"
		>
			<main className="grow">
				<div className="my-3">
					<button
						onClick={goToAddEmployee}
						className="btn btn-blue mr-2"
					>
						Add New Employee
					</button>
				</div>
				<Table
					theads={tableHeads}
					noDataText="No employees data"
					dataCount={employeesQuery.data?.data?.length ?? 0}
				>
					{employeesQuery.data?.data?.length &&
						employeesQuery.data?.data.map((employee) => (
							<tr key={employee._id}>
								<td data-label="Name">{employee.name}</td>
								<td data-label="Email">{employee.email}</td>
								<td data-label="Phone number">{employee.phoneNumber}</td>
								<td data-label="Date of employment">
									{employee.dateOfEmployment}
								</td>
								<td data-label="City">{employee.homeAddress.city}</td>
								<td
									data-label="Actions"
									className="min-w-[170px]"
								>
									<div>
										<button
											onClick={() => handleEditEmployee(employee._id)}
											className="btn btn-yellow mr-2"
										>
											Edit
										</button>
										<button
											onClick={() => {
												toggleDeleteEmployeeModal();
												setEmployeeId(employee._id);
											}}
											className="btn btn-red"
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
				</Table>
				{employeesQuery.data && employeesQuery.data?.totalResults !== 0 && (
					<Pagination
						className="pagination-bar mt-10"
						currentPage={currentPage || 1}
						totalCount={employeesQuery.data?.totalResults}
						onPageChange={(p) => setCurrentPage(p)}
						pageSize={DEFAULT_PAGE_SIZE_LIMIT}
					/>
				)}
				<Link
					href={ROUTES.DELETED_EMPLOYEES}
					className="text-red-600 hover:underline mt-2 flex"
				>
					See list of deleted employees
				</Link>
			</main>
			<ModalTypes
				open={deleteEmployeeModal}
				toggleModal={toggleDeleteEmployeeModal}
				type="warning"
				warningButtonText="YES"
				warningButtonAction={handleDeleteEmployee}
			>
				<p>Da li zelite obrisati ovog zaposlenog?</p>
			</ModalTypes>
		</MainLayout>
	);
};

export default Home;
