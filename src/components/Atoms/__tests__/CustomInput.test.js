import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { CustomInput } from '../CustomInput';

describe('CustomInput', () => {
	const id = 'input-id';
	const label = 'Input Label';
	const mockIcon = <span>Icon</span>;

	test('renders input component just with label (no icon)', () => {
		render(
			<CustomInput
				id={id}
				label={label}
			/>
		);

		const inputIconElement = screen.getByTestId('input-icon-element');
		const inputElement = screen.getByTestId('input-element');
		const labelElement = screen.getByText(label);

		expect(inputElement).toBeInTheDocument();
		expect(labelElement).toBeInTheDocument();
		expect(inputIconElement.children.length).toBe(1);
	});

	test('renders input component with label and icon on the right by default', () => {
		render(
			<CustomInput
				id={id}
				label={label}
				icon={mockIcon}
			/>
		);

		const inputElement = screen.getByTestId('input-element');
		const iconElement = screen.getByTestId('icon-element');

		expect(inputElement).toBeInTheDocument();
		expect(iconElement).toBeInTheDocument();
	});

	test('renders input component with label and icon on the left', () => {
		render(
			<CustomInput
				id={id}
				label={label}
				icon={mockIcon}
				iconPosition="left"
			/>
		);

		const inputElement = screen.getByTestId('input-element');
		const iconElement = screen.getByText('Icon');

		expect(inputElement).toBeInTheDocument();
		expect(iconElement).toBeInTheDocument();
	});

	test('triggers icon function when icon is clicked', () => {
		const mockIconFunction = jest.fn();
		const iconState = true;

		render(
			<CustomInput
				id={id}
				label={label}
				icon={mockIcon}
				iconFunction={mockIconFunction}
				iconState={iconState}
			/>
		);

		const iconElement = screen.getByText('Icon');
		fireEvent.click(iconElement);

		expect(mockIconFunction).toHaveBeenCalledTimes(1);

		expect(mockIconFunction).toHaveBeenCalledWith(!iconState);
	});

	test('displays error message when errors prop is provided', () => {
		const mockError = 'Invalid input';
		render(
			<CustomInput
				id={id}
				label={label}
				errors={mockError}
			/>
		);

		const errorElement = screen.getByText(mockError);

		expect(errorElement).toBeInTheDocument();
	});

	test('handling input onChange and returns typed text', () => {
		const inputValue = 'test123';
		render(
			<CustomInput
				id={id}
				label={label}
			/>
		);

		const inputElement = screen.getByTestId('input-element');
		fireEvent.change(inputElement, { target: { value: inputValue } });

		expect(inputElement.value).toBe(inputValue);
	});
});
