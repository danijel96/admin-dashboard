import clsx from 'clsx';
import { FC } from 'react';

// internal imports
import { LOADING_TEXT } from 'common/constants/global.contants';

interface SpinnerLoaderProps {
	title?: string;
	component?: boolean;
	className?: string;
}

export const SpinnerLoader: FC<SpinnerLoaderProps> = ({
	title = LOADING_TEXT,
	component = false,
	className,
}) => {
	return (
		<div
			className={clsx(
				'flex items-center justify-center z-10',
				component
					? 'bg-transparent w-40 h-36 grid place-items-center place-content-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'
					: 'bg-white fixed h-screen w-screen left-0 top-0',
				className
			)}
		>
			<button
				type="button"
				className="flex items-center rounded-lg bg-primary-main px-4 py-2 text-black"
				disabled
			>
				<svg
					className="mr-3 h-5 w-5 animate-spin text-black"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				<span className="font-medium text-lg"> {title} </span>
			</button>
		</div>
	);
};
