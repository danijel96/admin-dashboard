import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { FC, Fragment, PropsWithChildren } from 'react';

interface DrawerProps {
	isOpen: boolean;
	closeDrawer: () => void;
	title?: string;
	headerDrawer?: boolean;
	titleIcon?: JSX.Element;
	childrenClassName?: string;
}

export const Drawer: FC<PropsWithChildren<DrawerProps>> = ({
	children,
	isOpen,
	closeDrawer,
	title,
	titleIcon,
	childrenClassName,
}) => {
	return (
		<Transition
			show={isOpen}
			as={Fragment}
		>
			<Dialog
				unmount={false}
				onClose={closeDrawer}
				className="fixed z-30 inset-0"
			>
				<div className="flex w-full h-3/4 absolute bottom-0">
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-in duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-30"
						entered="opacity-30"
						leave="transition-opacity ease-out duration-300"
						leaveFrom="opacity-30"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="z-40 fixed inset-0 bg-black" />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter="transition ease-in duration-300"
						enterFrom="translate-y-full"
						enterTo="translate-y-0"
						leave="transition ease-in duration-300"
						leaveFrom="translate-y-0"
						leaveTo="translate-y-full"
					>
						<div
							className="flex flex-col justify-between bg-white z-50
                            w-full p-6 text-left
                            align-middle shadow-xl rounded-t-2xl"
						>
							<div className="flex justify-between">
								{titleIcon}
								<Dialog.Title className="font-bold text-2xl md:text-4xl text-blue-500">
									{title}
								</Dialog.Title>
								<button onClick={closeDrawer}>
									<XMarkIcon
										color="black"
										width={20}
									/>
								</button>
							</div>
							<div
								className={clsx(
									'overflow-y-scroll overflow-x-hidden mt-3',
									childrenClassName
								)}
							>
								{children}
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};
