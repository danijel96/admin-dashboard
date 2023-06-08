import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

interface TableHead {
	name: string;
}

interface TableProps {
	theads: Array<TableHead>;
	dataCount: number;
	noDataText: string;
	className?: string;
	theadsClassName?: string;
}

export const Table: FC<PropsWithChildren<TableProps>> = ({
	theads,
	dataCount,
	noDataText,
	theadsClassName,
	className,
	children,
}) => {
	return (
		<div className="container">
			<table className={clsx('table-component', className)}>
				<thead>
					<tr className="[&>*]:truncate">
						{theads.map((thead, index) => {
							return (
								<th
									key={index}
									className={theadsClassName}
									role="columnheader"
								>
									{thead.name}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody data-testid='tbody-element'>
					{dataCount !== 0 ? (
						children
					) : (
						<tr>
							<td
								colSpan={theads.length}
								className="text-center py-5"
							>
								{noDataText}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
