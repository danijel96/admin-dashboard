import { forwardRef } from 'react';

type ConditionalProps =
	| {
			icon?: null;
			iconPosition?: never;
			iconFunction?: never;
			iconState?: never;
	  }
	| {
			icon: JSX.Element;
			iconPosition?: 'left' | 'right';
			iconFunction?: (prevState: boolean) => void;
			iconState?: boolean;
	  };

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
	id: string;
	className?: string;
	wrapperClassName?: string;
	label?: string;
	type?: string;
	errors?: string;
}

type Props = InputProps & ConditionalProps;

export const CustomInput = forwardRef<HTMLInputElement, Props>(
	(
		{
			id,
			className = '',
			wrapperClassName = '',
			label = '',
			icon,
			iconPosition = 'right',
			type = 'text',
			iconFunction,
			iconState,
			errors = '',
			...props
		},
		ref
	) => {
		// if (icon && !iconPosition) iconPosition = 'right'

		return (
			<div
				className={`custom-input flex flex-col w-full ${
					wrapperClassName || ''
				}`}
			>
				{label && (
					<label
						className="text-[12px] text-primary-lighter z-[2] w-fit mb-1 font-bold"
						htmlFor={id}
					>
						{label}
					</label>
				)}

				<div className="relative">
					<input
						{...props}
						type={type}
						className={`py-2 px-2 rounded-md border text-[16px] font-normal border-grey-grey800 placeholder:text-black placeholder:text-sm w-full ${
							className || ''
						} ${icon && iconPosition === 'right' ? 'pr-10' : ''} ${
							icon && iconPosition === 'left' ? 'pl-10' : ''
						}
            `}
						ref={ref}
						id={id}
					/>
					{icon && (
						<div
							className={`absolute -translate-y-[50%] z-10 ${
								iconPosition === 'right'
									? 'top-[50%] right-4'
									: ' top-[50%] left-4'
							}`}
							onClick={() => iconFunction && iconFunction(!iconState)}
						>
							{icon}
						</div>
					)}
				</div>
				{errors !== '' && (
					<p className="text-error-main text-xs mt-1">{errors}</p>
				)}
			</div>
		);
	}
);
CustomInput.displayName = 'CustomInput';
