import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment, PropsWithChildren } from 'react';

export interface BaseModalProps {
	open: boolean;
	toggleModal: (b: boolean) => void;
	title?: string;
	icon?: JSX.Element;
	iconBgColor?: string;
	wrapperClassName?: string;
	className?: string;
	actions?: JSX.Element;
}

export const BaseModal: FC<PropsWithChildren<BaseModalProps>> = ({
	open,
	toggleModal,
	title,
	icon,
	iconBgColor,
	wrapperClassName,
	className,
	actions,
	children,
}) => {
	return (
		<Transition.Root
			show={open}
			as={Fragment}
		>
			<Dialog
				as="div"
				className="relative z-[999]"
				onClose={toggleModal}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-neutral-50 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div
					className={clsx(wrapperClassName, 'fixed inset-0 overflow-y-auto')}
				>
					<div className="flex min-h-full items-center justify-center text-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel
								className={clsx(
									'relative w-[90vw] max-w-lg transform overflow-hidden rounded-2xl bg-background text-left shadow-xl transition-all sm:my-8 sm:w-full',
									className
								)}
							>
								{title && (
									<div className="modal-header flex flex-row items-center justify-between gap-3 p-5">
										<div className="flex gap-2.5">
											{icon && (
												<div
													className={clsx(
														'mx-auto flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full sm:mx-0',
														iconBgColor
													)}
												>
													{icon}
												</div>
											)}

											<Dialog.Title
												as="h4"
												className="flex items-center text-lg font-bold leading-6 text-font-primary"
											>
												{title}
											</Dialog.Title>
										</div>
									</div>
								)}
								<div className="modal-content p-5 text-center">{children}</div>
								{actions}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
