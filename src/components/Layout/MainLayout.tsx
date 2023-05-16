import clsx from 'clsx';
import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';

// internal imports
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';

interface MainLayoutProps {
	wrapperClassName?: string;
	headTitle?: string;
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
	children,
	wrapperClassName,
	headTitle,
}) => {
	return (
		<>
			<Head>
				<title>{headTitle}</title>
			</Head>
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
