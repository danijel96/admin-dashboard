import { FC } from 'react';
import clsx from 'clsx';

// internal imports
import { DOTS, usePagination } from 'common/hooks/usePagination';

interface PaginationProps {
	currentPage: number;
	totalCount: number;
	onPageChange: (no: number) => void;
	pageSize?: number;
	onLimitChange?: (no: number) => void;
	className?: string;
}

export const Pagination: FC<PaginationProps> = ({
	currentPage,
	totalCount,
	onPageChange,
	pageSize = 5,
	onLimitChange,
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
		<div className={clsx('pagination-wrapper', className)}>
			<ul className={clsx('pagination-list')}>
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

			{onLimitChange && (
				<div className="limit-wrapper text-font-primary">
					<p>Page size: &nbsp;</p>
					<select
						name="limit"
						id="limit"
						className="text-black"
						onChange={(e) => onLimitChange(+e.target.value)}
						value={pageSize}
					>
						<option value="2">2</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
					</select>
					<p>&nbsp; Total: {totalCount}</p>
				</div>
			)}
		</div>
	);
};
