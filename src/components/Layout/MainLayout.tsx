import clsx from 'clsx';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { FC } from 'react';

interface MainLayoutProps {
	children: JSX.Element | JSX.Element[] | React.ReactNode;
	wrapperClassName?: string;
	pageClassName?: string;
	bgClassName?: string;
	navbar?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = ({
	children,
	wrapperClassName,
}) => {
	return (
		<>
			<div
				className={clsx(
					'main-layout-wrapper mx-auto min-h-screen w-full max-w-4xl flex flex-col p-5',
					wrapperClassName
				)}
			>
				<Header />
				{children}

				<Footer />
			</div>
		</>
	);
};
