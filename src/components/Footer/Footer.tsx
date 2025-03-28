import Link from 'next/link';
import { FC } from 'react';
import { useMedia } from 'react-use';

// internal imports
import { BREAKPOINTS } from 'common/constants/global.constants';
import { currentYear } from 'common/utils/date.utils';
import { GithubLogo, LinkedinLogo } from 'components/Icons/Icons';

export const Footer: FC = () => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true);

	return (
		<footer className="flex flex-col sm:flex-row gap-y-3 justify-between items-center px-7 pt-6 pb-2 border-t-2 mt-10">
			<p className="text-center text-font-primary">
				Powered by&nbsp;
				<Link
					href="https://nextjs.org/"
					target="_blank"
					className="text-sm"
				>
					Next.js {currentYear()}
				</Link>
			</p>
			<p className="text-sm text-font-primary">© Danijel Jovanovic</p>
			<div className="flex items-center">
				<div className="social-icons flex items-center gap-1 ml-4 flex-col mini:gap-5 mini:flex-row">
					<Link
						href="https://www.linkedin.com/in/jovanovic-danijel/"
						className="flex text-font-primary items-center gap-x-2 hover:underline"
						title="See my LinkedIn profile"
					>
						{isMobile && <span>LinkedIn profile:</span>}
						<LinkedinLogo
							width={25}
							className="cursor-pointer"
						/>
					</Link>
					<Link
						href="https://github.com/danijel96/admin-dashboard"
						className="flex items-center text-font-primary gap-x-2 hover:underline"
						title="See GitHub repo"
					>
						{isMobile && <p>GitHub repo:</p>}
						<GithubLogo
							width={25}
							className="cursor-pointer [&>path]:fill-font-primary"
						/>
					</Link>
				</div>
			</div>
		</footer>
	);
};
