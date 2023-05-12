import { CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

// internal imports
import { WarningIcon } from 'components/Icons/Icons';
import { BaseModal } from './BaseModal';

export type ModalVariant = 'warning' | 'success' | 'info' | 'question';

interface ModalTypesProps {
	type: ModalVariant;
	open: boolean;
	toggleModal: () => void;
	title?: string;
	warningButtonText?: string; // warning
	negationButtonText?: string;
	warningButtonAction?: () => void; // warning
	cancelButtonAction?: () => void; // warning
	infoButtonText?: string;
}

export const ModalTypes: FC<PropsWithChildren<ModalTypesProps>> = ({
	type,
	title,
	open,
	toggleModal,
	warningButtonText,
	negationButtonText,
	warningButtonAction,
	cancelButtonAction,
	infoButtonText,
	children,
}) => {
	const renderDivButton = (text: string) => (
		<div className="modal-actions-wrapper m-5">
			<button
				className="modal-btn close-modal-btn w-full justify-center rounded-radius-50 py-4 text-white"
				onClick={toggleModal}
			>
				{text}
			</button>
		</div>
	);
	const warningButtonActionHandler = () => {
		if (warningButtonAction) {
			warningButtonAction();
		}
		toggleModal();
	};
	const renderIconBgColor = () => {
		let color: string = 'bg-secondary-95';
		if (type === 'warning') color = 'bg-white';
		if (type === 'success') color = 'bg-primary';
		return color;
	};
	const renderActions = () => {
		if (type === 'info') {
			return renderDivButton(infoButtonText || 'Ok');
		}
		if (type === 'warning' || type === 'question') {
			return (
				<div className="modal-actions-wrapper mt-3 flex flex-col items-center gap-x-4 px-5 pb-4 md:flex-row">
					<button
						className={clsx(
							'modal-btn mb-5 w-full justify-center rounded-radius-50 bg-coloredLinearGradient py-4 text-white bg-red-600 rounded-xl md:mb-0',
							type === 'warning' ? 'warning-modal-btn' : 'question-modal-btn'
						)}
						onClick={warningButtonActionHandler}
					>
						{warningButtonText || 'DELETE'}{' '}
					</button>

					<button
						className="modal-btn close-modal-btn w-full justify-center rounded-radius-50 py-4"
						onClick={() =>
							cancelButtonAction ? cancelButtonAction() : toggleModal()
						}
					>
						{negationButtonText || 'CANCEL'}{' '}
					</button>
				</div>
			);
		}
		if (type === 'success') {
			return renderDivButton('Okay');
		}
		return <span />;
	};
	const renderIcon = () => {
		// eslint-disable-next-line no-undef
		let icon;
		if (type === 'warning') icon = <WarningIcon />;
		if (type === 'success')
			icon = (
				<CheckIcon
					className="text-primary-60 h-8"
					aria-hidden="true"
				/>
			);
		return icon;
	};
	return (
		<BaseModal
			title={title}
			toggleModal={toggleModal}
			open={open}
			icon={renderIcon()}
			iconBgColor={renderIconBgColor()}
			actions={renderActions()}
		>
			{children}
		</BaseModal>
	);
};
