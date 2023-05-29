import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

// internal imports
import {
	DEFAULT_PAGE_SIZE_LIMIT,
	QUERY_KEYS,
} from 'common/constants/api.constants';
import { deletedEmployeesTableHeads } from 'common/constants/table.constants';
import { ResponseErrorDTO } from 'common/contracts/api/response/error.contracts';
import { useLocalStorage } from 'common/hooks/useLocalStorage';
import {
	getDeletedEmployeesAPI,
	permanentDeleteEmployeeAPI,
} from 'common/services/api/employees';
import { formatDateTime } from 'common/utils/date.utils';
import { SpinnerLoader } from 'components/Atoms/SpinnerLoader';
import { MainLayout } from 'components/Layout/MainLayout';
import { ModalTypes } from 'components/Modal/ModalTypes';
import { Pagination } from 'components/Pagination/Pagination';
import { Table } from 'components/Table/Table';

const DeletedEmployees: NextPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useLocalStorage(
		'page-limit',
		DEFAULT_PAGE_SIZE_LIMIT
	);

	const [employeeId, setEmployeeId] = useState('');
	const [deleteEmployeeModal, setDeleteEmployeeModal] = useState(false);

	const employeesQuery = useQuery({
		queryKey: [QUERY_KEYS.DELETED_EMPLOYEES, { page: currentPage, limit }],
		queryFn: () =>
			getDeletedEmployeesAPI({
				page: currentPage,
				limit,
			}),
	});

	const queryClient = useQueryClient();

	const permanentDeleteEmployeeMutation = useMutation({
		mutationFn: permanentDeleteEmployeeAPI,
	});

	const handleDeleteEmployee = () => {
		permanentDeleteEmployeeMutation.mutate(employeeId, {
			onSuccess() {
				toast.success('Successfully permanently deleted employee!', {
					id: 'deleteEmployee',
				});
				queryClient.invalidateQueries([QUERY_KEYS.DELETED_EMPLOYEES]);
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

	if (employeesQuery.isLoading) {
		return <SpinnerLoader />;
	}

	return (
		<MainLayout
			wrapperClassName="deleted-employees-page mx-auto"
			headTitle="Deleted Employees"
		>
			<main className="grow my-5">
				<p className="mb-5">Deleted Employees</p>
				<Table
					theads={deletedEmployeesTableHeads}
					dataCount={employeesQuery.data?.data?.length ?? 0}
					noDataText="No deleted employees data"
				>
					{employeesQuery.data?.data?.length &&
						employeesQuery.data?.data.map((employee) => (
							<tr key={employee._id}>
								<td data-label={deletedEmployeesTableHeads[0].name}>
									{employee.name}
								</td>
								<td data-label={deletedEmployeesTableHeads[1].name}>
									{employee.email}
								</td>
								<td data-label={deletedEmployeesTableHeads[2].name}>
									{employee.phoneNumber}
								</td>
								{employee.deletedAt && (
									<td data-label={deletedEmployeesTableHeads[3].name}>
										{formatDateTime(employee.deletedAt)}
									</td>
								)}
								<td data-label={deletedEmployeesTableHeads[4].name}>
									{employee.homeAddress.city}
								</td>
								<td
									data-label={deletedEmployeesTableHeads[5].name}
									className="min-w-[170px]"
								>
									<div>
										<button
											onClick={() => {
												toggleDeleteEmployeeModal();
												setEmployeeId(employee._id);
											}}
											className="btn btn-red"
										>
											Full Delete
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
						pageSize={limit}
						onLimitChange={(limit) => setLimit(limit)}
					/>
				)}
			</main>
			<ModalTypes
				open={deleteEmployeeModal}
				toggleModal={toggleDeleteEmployeeModal}
				type="warning"
				warningButtonText="YES"
				warningButtonAction={handleDeleteEmployee}
			>
				<p>Da li zelite zauvek obrisati ovog zaposlenog?</p>
			</ModalTypes>
		</MainLayout>
	);
};

export default DeletedEmployees;
