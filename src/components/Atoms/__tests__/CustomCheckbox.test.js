import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { CustomCheckbox } from '../CustomCheckbox';

describe('CustomCheckbox', () => {
	const testId = 'checkbox-element';
	const id = 'checkbox-id';
	const label = 'Checkbox Label';

	test('renders checkbox component with label', () => {
		render(
			<CustomCheckbox
				id={id}
				label={label}
				checked={false}
				onChange={() => {}}
			/>
		);

		const inputElement = screen.getByTestId(testId);
		const labelElement = screen.getByText(label);

		expect(inputElement).toBeInTheDocument();
		expect(inputElement).not.toBeChecked();
		expect(labelElement).toBeInTheDocument();
	});
	test('handles onChange event and changes input value to true', () => {
		let checked = false; // Declare a variable to hold the checked state
		const handleChange = jest.fn((event) => {
			checked = event.target.checked;
		});

		render(
			<CustomCheckbox
				id={id}
				label={label}
				checked={checked}
				value={false}
				onChange={handleChange}
			/>
		);

		const inputElement = screen.getByTestId(testId);

		fireEvent.click(inputElement);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(checked).toBe(true);
	});
});
