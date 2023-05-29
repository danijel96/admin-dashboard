import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

// internal imports
import { ROUTES } from 'common/constants/routes';
import { useRouter } from 'next/router';

export const Header: FC = () => {
	const router = useRouter();
	console.log(router.pathname, 'router.basePath');
	return (
		<header className="flex justify-between items-center border-b-2">
			<Link href={ROUTES.HOME}>Admin dashboard</Link>
			<Link
				href={ROUTES.HOME}
				className={clsx(
					'hover:bg-[#f2f2f2] p-4',
					router.pathname === '/' && 'border-b-[2px] border-blue-500 -mb-[2px]'
				)}
			>
				Home
			</Link>
		</header>
	);
};
