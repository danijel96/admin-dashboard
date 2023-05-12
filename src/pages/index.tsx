import { useQuery, useQueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMedia } from 'react-use';

// internal imports
import { BREAKPOINTS } from 'common/constants/global.contants';
import { ROUTES } from 'common/constants/routes';
import {
	getAllEmployeesAPI,
	softDeleteEmployeeAPI,
} from 'common/services/api/hooks/getAllEmployees';
import { MainLayout } from 'components/Layout/MainLayout';
import { ModalTypes } from 'components/Modal/ModalTypes';

const Home: NextPage = () => {
	const router = useRouter();

	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true); // true is defaultState parameter for ssr to avoid hydration error

	const [employeeId, setEmployeeId] = useState('');
	const [deleteEmployeeModal, setDeleteEmployeeModal] = useState(false);

	const employeesQuery = useQuery({
		queryKey: ['employees'],
		queryFn: getAllEmployeesAPI,
		retry: 1,
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

	const handleDeleteEmployee = async () => {
		const response = await softDeleteEmployeeAPI(employeeId);
		queryClient.invalidateQueries(['employees']);
	};

	const toggleDeleteEmployeeModal = () => {
		setDeleteEmployeeModal(!deleteEmployeeModal);
	};

	return (
		<MainLayout wrapperClassName="employees-page min-w-[320px] bg-white">
			<Head>
				<title>Employees</title>
			</Head>
			<main className="grow">
				<div className="my-3">
					<button
						onClick={goToAddEmployee}
						className="btn btn-blue mr-2"
					>
						Add New Employee
					</button>
				</div>
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
								))
							) : (
								<tr>
									<td
										colSpan={6}
										className="text-center"
									>
										No employees data
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
				<p>Da li zelite obrisati ovog zaposlenog?</p>
			</ModalTypes>
		</MainLayout>
	);
};

export default Home;
