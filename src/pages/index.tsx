import { NextPage } from 'next';
import Head from 'next/head';
import { useMedia } from 'react-use';

// internal imports
import { BREAKPOINTS } from 'common/constants/global.contants';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';

const Home: NextPage = () => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true); // true is defaultState parameter for ssr to avoid hydration error

	
	return (
		<div className="employee-page min-h-screen max-w-4xl min-w-[320px] bg-white p-5 mx-auto">
			<Head>
				<title>Employees</title>
			</Head>
			<Header />
			<main></main>

			<Footer />
		</div>
	);
};

export default Home;
