import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMedia } from 'react-use';

// internal imports
import { QUERY_KEYS } from 'common/constants/api.constants';
import { BREAKPOINTS } from 'common/constants/global.contants';
import { ResponseErrorDTO } from 'common/contracts/api/response/error.contracts';
import {
	getDeletedEmployeesAPI,
	permanentDeleteEmployeeAPI,
} from 'common/services/api/employees';
import { MainLayout } from 'components/Layout/MainLayout';
import { ModalTypes } from 'components/Modal/ModalTypes';

const DeletedEmployees: NextPage = () => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true);

	const router = useRouter();

	const [employeeId, setEmployeeId] = useState('');
	const [deleteEmployeeModal, setDeleteEmployeeModal] = useState(false);

	const employeesQuery = useQuery({
		queryKey: [QUERY_KEYS.DELETED_EMPLOYEES],
		queryFn: () => getDeletedEmployeesAPI(),
	});

	const queryClient = useQueryClient();

	const permanentDeleteEmployeeMutation = useMutation({
		mutationFn: permanentDeleteEmployeeAPI,
	});

	const handleDeleteEmployee = async () => {
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

	return (
		<MainLayout
			wrapperClassName="deleted-employees-page mx-auto"
			headTitle="Deleted Employees"
		>
			<main className="grow my-5">
				<p className="mb-5">Deleted Employees</p>
				<div className="container">
					<table>
						<thead>
							<tr className="[&>*]:truncate">
								<th>Name</th>
								<th>Email</th>
								<th>Phone number</th>
								<th>Date of employment</th>
								<th>City</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{employeesQuery.data?.employees?.length ? (
								employeesQuery.data?.employees.map((employee) => (
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
								))
							) : (
								<tr>
									<td
										colSpan={6}
										className="text-center py-5"
									>
										No deleted employees data
									</td>
								</tr>
							)}
						</tbody>
					</table>
					{/* NEED TO DO PAGINATION */}
				</div>
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
