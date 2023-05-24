import { FC } from 'react';
import clsx from 'clsx';

// internal imports
import { DOTS, usePagination } from 'common/hooks/usePagination';

interface PaginationProps {
	currentPage: number;
	totalCount: number;
	onPageChange: (no: number) => void;
	pageSize?: number;
	className?: string;
}

export const Pagination: FC<PaginationProps> = ({
	currentPage,
	totalCount,
	onPageChange,
	pageSize = 5,
	className,
}) => {
	const siblingCount = 1;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];

	return (
		<ul className={clsx('pagination-container', className)}>
			<li
				className={clsx('pagination-item', {
					disabled: currentPage === 1,
				})}
				onClick={onPrevious}
			>
				<div className="arrow left" />
			</li>
			{paginationRange?.map((pageNumber) => {
				if (pageNumber === DOTS) {
					return (
						<li
							key={pageNumber}
							className="pagination-item dots"
						>
							&#8230;
						</li>
					);
				}

				return (
					<li
						key={pageNumber}
						className={clsx('pagination-item', {
							selected: pageNumber === currentPage,
						})}
						onClick={() => onPageChange(+pageNumber)}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={clsx('pagination-item', {
					disabled: currentPage === lastPage,
				})}
				onClick={onNext}
			>
				<div className="arrow right" />
			</li>
		</ul>
	);
};
