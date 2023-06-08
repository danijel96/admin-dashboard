import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Table } from '../Table';

describe('Table component', () => {
	const theads = [
		{ name: 'Header 1' },
		{ name: 'Header 2' },
		{ name: 'Header 3' },
	];

	test('renders table headers correctly', () => {
		render(
			<Table
				theads={theads}
				dataCount={0}
				noDataText="No data"
			/>
		);

		const tableHeaders = screen.getAllByRole('columnheader');

		expect(tableHeaders).toHaveLength(theads.length);
		tableHeaders.forEach((header, index) => {
			expect(header).toHaveTextContent(theads[index].name);
		});
	});

	test('renders no data text when dataCount is 0', () => {
		const noDataText = 'No data available';
		render(
			<Table
				theads={theads}
				dataCount={0}
				noDataText={noDataText}
			/>
		);

		const noDataCell = screen.getByText(noDataText);
		expect(noDataCell).toBeInTheDocument();
		expect(noDataCell.closest('tr')).toBeInTheDocument();
	});

	test('renders table rows when dataCount is not 0', () => {
		const dataCount = 3;
		render(
			<Table
				theads={theads}
				dataCount={dataCount}
				noDataText="No data"
			>
				<tr>
					<td>Row 1</td>
				</tr>
				<tr>
					<td>Row 2</td>
				</tr>
				<tr>
					<td>Row 3</td>
				</tr>
			</Table>
		);

		const tbodyElement = screen.getByTestId('tbody-element');
		const tableRows = tbodyElement.querySelectorAll('tr');
		expect(tableRows).toHaveLength(dataCount);
		tableRows.forEach((row, index) => {
			expect(row).toHaveTextContent(`Row ${index + 1}`);
		});
	});
});
