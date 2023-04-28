import { FC } from 'react';

export const ErrorComponent: FC = () => {
	return (
		<div className="h-screen grow-[2] flex flex-col items-center justify-center">
			<p className="text-info-lighter text-[18px]">
				Ooops. Something went wrong! Try again later.
			</p>
		</div>
	);
};
