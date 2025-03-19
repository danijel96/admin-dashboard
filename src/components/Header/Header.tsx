import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

// internal imports
import { ROUTES } from 'common/constants/routes';
import { useRouter } from 'next/router';
import { ToggleTheme } from 'components/ToggleTheme';

export const Header: FC = () => {
	const router = useRouter();

	return (
		<header className="flex justify-between items-center border-b-2">
			<Link
				href={ROUTES.HOME}
				className="text-font-primary"
			>
				Admin dashboard
			</Link>
			<div className="flex items-center gap-5">
				<ToggleTheme />
				<Link
					href={ROUTES.HOME}
					className={clsx(
						'hover:bg-secondary p-4 text-font-primary bg-background hover:text-background',
						router.pathname === '/' &&
							'border-b-[2px] border-blue-500 -mb-[2px]'
					)}
				>
					Home
				</Link>
			</div>
		</header>
	);
};
