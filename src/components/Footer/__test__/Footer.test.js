import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '../Footer';

describe('Footer component', () => {
	test('renders powered by Next.js link', () => {
		render(<Footer />);

		const poweredBy = screen.getByText('Powered by');
		const nextjsLink = screen.getByText(/Next\.js/);

		expect(poweredBy).toBeInTheDocument();
		expect(nextjsLink).toBeInTheDocument();
		expect(nextjsLink).toHaveAttribute('href', 'https://nextjs.org/');
	});

	test('renders author name', () => {
		render(<Footer />);

		const authorName = screen.getByText('© Danijel Jovanovic');
		expect(authorName).toBeInTheDocument();
	});

	test('renders LinkedIn and GitHub links properly', () => {
		render(<Footer />);

		const linkedInLink = screen.getByTitle('See my LinkedIn profile');
		expect(linkedInLink).toBeInTheDocument();
		expect(linkedInLink).toHaveAttribute(
			'href',
			'https://www.linkedin.com/in/jovanovic-danijel/'
		);

		const githubLink = screen.getByTitle('See GitHub repo');
		expect(githubLink).toBeInTheDocument();
		expect(githubLink).toHaveAttribute(
			'href',
			'https://github.com/danijel96/admin-dashboard'
		);
	});
});
