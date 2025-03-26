import { ChangeEvent, FC, useRef, useState } from 'react';
import {
	CheckIcon,
	MagnifyingGlassIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useClickAway, useDebounce } from 'react-use';
import { SpinnerLoader } from './SpinnerLoader';

export interface IDropdownData {
	name: string;
	id: string;
	svg?: React.ReactNode | string;
}

interface AutoCompleteDropdownProps {
	dropdownData: IDropdownData[];
	selectedIdentifiers: string[];
	changeHandler: (inputValue: string) => void; // follows when user types in input and call this changeHandler from parent
	clickOnItemHandler: (id: string) => void;
	placeholder?: string;
	isLoading?: boolean;
	wrapperClassName?: string;
}

export const AutoCompleteDropdown: FC<AutoCompleteDropdownProps> = ({
	dropdownData,
	selectedIdentifiers,
	clickOnItemHandler,
	changeHandler,
	placeholder,
	isLoading = false,
	wrapperClassName,
}) => {
	const [openDropdown, setOpenDropdown] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const clickOutsideRef = useRef(null);

	/**
	 * Close dropdown list if click anywhere outside input
	 */
	useClickAway(clickOutsideRef, () => {
		setOpenDropdown(false);
	});

	const handleInputFocus = () => {
		setOpenDropdown(true);
	};

	/**
	 * Call change handler function after 700 miliseconds when user stops typing
	 */
	useDebounce(
		async () => {
			changeHandler(inputValue);
		},
		700,
		[inputValue]
	);

	const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const searchWord = event.target.value;
		setInputValue(searchWord);
	};

	const clearInput = () => {
		setInputValue('');
		setOpenDropdown(false);
	};

	return (
		<div
			className={clsx(
				'custom-autocomplete-dropdown max-w-[300px] relative',
				wrapperClassName
			)}
		>
			<div className="search-input flex items-center p-3 bg-background rounded-xl">
				<MagnifyingGlassIcon
					width={18}
					color="#7B858F"
				/>
				<input
					type="text"
					className="grow-[2] bg-transparent px-1 ml-1 focus:outline-none"
					placeholder={placeholder}
					value={inputValue}
					onChange={handleInputChange}
					onClick={handleInputFocus}
					ref={clickOutsideRef}
				/>
				<div className="search-icon bg-transparent">
					{inputValue && (
						<XMarkIcon
							className="cursor-pointer"
							width={18}
							color="#7B858F"
							onClick={clearInput}
						/>
					)}
				</div>
			</div>
			{openDropdown && (
				<ul
					className={clsx(
						'data-result absolute w-full mt-2 bg-background rounded-lg',
						dropdownData?.length > 0 ? 'max-h-[280px]' : '',
						isLoading ? 'relative h-[60px]' : ''
					)}
					ref={clickOutsideRef}
				>
					{dropdownData.length === 0 ? (
						<li className="flex items-center justify-center py-4">
							{isLoading ? <SpinnerLoader component /> : 'No data'}
						</li>
					) : (
						dropdownData.map((item) => {
							const selectedItem = selectedIdentifiers.find(
								(identifier) => identifier === item.id
							);
							return (
								<li
									key={item.id}
									className={clsx(
										'p-4 cursor-pointer hover:bg-hover flex items-center justify-between text-primary-lighter',
										selectedItem
											? 'selected text-font-primary bg-hover'
											: ''
									)}
									onClick={() => clickOnItemHandler(item.id)}
								>
									<span>
										{item.svg}&nbsp;&nbsp;
										{item.name}
									</span>
									{selectedItem && (
										<CheckIcon
											width={21}
											className="check-icon"
										/>
									)}
								</li>
							);
						})
					)}
				</ul>
			)}
		</div>
	);
};
