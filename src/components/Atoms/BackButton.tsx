import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface BackButtonProps {
	className?: string;
}

export const BackButton: FC<BackButtonProps> = ({ className }) => {
	const router = useRouter();

	const goBack = () => {
		router.back();
	};

	return (
		<div className={clsx('w-fit px-2.5', className)}>
			<p
				onClick={goBack}
				className="flex cursor-pointer items-center text-black"
			>
				<ArrowLeftIcon
					width={20}
					className="mr-2"
				/>
				<span>Back</span>
			</p>
		</div>
	);
};
