import Link from 'next/link';
import { FC } from 'react';

// internal imports
import { ROUTES } from 'common/constants/routes';

export const Header: FC = () => {
	return (
		<header className="flex justify-between border-b-2 pb-4">
			<Link href={ROUTES.HOME}>Admin dashboard</Link>
		</header>
	);
};
