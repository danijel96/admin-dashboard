import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BaseModal } from '../BaseModal';

jest.mock('@headlessui/react', () => ({
	...jest.requireActual('@headlessui/react'),
	FocusTrap: jest.fn(({ children }) => <div>{children}</div>),
}));

describe('BaseModal component', () => {
	test('renders the modal title', () => {
		const title = 'Test Modal';
		render(
			<BaseModal
				open={true}
				toggleModal={() => {}}
				title={title}
			>
				<p>{'child text'}</p>
			</BaseModal>
		);
		const modalTitle = screen.getByText(title);
		expect(modalTitle).toBeInTheDocument();
	});

	test('invokes the toggleModal function when closed', () => {
		const toggleModal = jest.fn();
		render(
			<BaseModal
				open={true}
				toggleModal={toggleModal}
			>
				<button onClick={toggleModal}>Close</button>
				<p>{'child text'}</p>
			</BaseModal>
		);
		const closeButton = screen.getByRole('button', { name: /close/i });
		fireEvent.click(closeButton);
		expect(toggleModal).toHaveBeenCalled();
	});

	test('renders the modal content & without title if it isnt provided', () => {
		const title = 'Test Modal';
		const content = 'Test Content';
		render(
			<BaseModal
				open={true}
				toggleModal={() => {}}
			>
				{content}
			</BaseModal>
		);
		const modalTitle = screen.queryByText(title);
		const modalContent = screen.getByText(content);

		expect(modalTitle).not.toBeInTheDocument();
		expect(modalContent).toBeInTheDocument();
	});
});

//import userEvent from '@testing-library/user-event';
