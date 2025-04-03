import {FC} from 'react';
import { CompactTable } from "@table-library/react-table-library/compact";
import {usePagination} from '@table-library/react-table-library/pagination';
import { useRowSelect } from "@table-library/react-table-library/select";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { colors } from "../../../constants/colors";

import { useTheme } from "@table-library/react-table-library/theme";
import { useSort, SortToggleType } from "@table-library/react-table-library/sort";

import { TbCaretUpDownFilled, TbCaretDownFilled, TbCaretUpFilled } from "react-icons/tb";

import { TableNode } from '@table-library/react-table-library/types/table';
import { Column } from '@table-library/react-table-library/types/compact';
import { TransactionTableItem } from '../../modules/Transactions/TrasactionTableItemType';

type ComposedTableProps = {
	columns: Column<TableNode>[];
	sortFns: {[key: string]: (array: any[]) => any[]};
	data: TransactionTableItem[];
	isSelect?: boolean;
	columnsStyle?: string;
	itemsPerPage?: number;
}

const ComposedTable : FC<ComposedTableProps> = ({columns, sortFns, data, columnsStyle = "40px minmax(0px, 1fr) minmax(0px, 2fr) minmax(0px, 1fr) minmax(0px, 1fr)", isSelect = true, itemsPerPage = 10}) => {	
	const tableData = {nodes: data}
	const select = useRowSelect(tableData);
	const theme = useTheme([{
		Row: `
			transition: background-color 0.2s;
			&:hover {
				background-color: rgba(0,0,0, 0.05);
			}
			&.row-select-selected{
				background-color: rgba(0,0,0, 0.1);
			}
		`,
		Cell: ``,
		HeaderCell: ``,
		Table: `
			grid-template-columns: ${columnsStyle};
		`
	}]);
	const onSortChange = (action : any, state : any) => console.log(action, state) 
	const sort = useSort(
		tableData, 
		{
			onChange: onSortChange
		},
		{
		sortIcon: {
			iconDefault: <TbCaretUpDownFilled />,
			iconUp: <TbCaretUpFilled />,
			iconDown: <TbCaretDownFilled />,
		},
		sortToggleType: SortToggleType.AlternateWithReset,
		sortFns
	})


	const pagination= usePagination(tableData, {
		state: {
			page: 0,
			size: itemsPerPage
		}
	});

  return (
		<div className="table-container">
			<CompactTable
				theme={theme}
				columns={columns}
				data={tableData} 
				pagination={pagination}
				select={isSelect ? select : undefined}
				sort={sort}
			/>

			<div className="table-pagination">
				<span className="table-pagination__information">
					{pagination.state.page + 1} of {pagination.state.getTotalPages(tableData.nodes)}
				</span>

				<span className="table-pagination__buttons">
					<button disabled = {pagination.state.page === 0} className="table-pagination__buttons-item" onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}>
						<FaChevronLeft size={20} color={colors.black}/>
					</button>
					<button disabled = {pagination.state.page+1 === pagination.state.getTotalPages(tableData.nodes)} className="table-pagination__buttons-item" onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}>
						<FaChevronRight size={20} color={colors.black} />
					</button>
				</span>
			</div>
		</div>
  );
};

export default ComposedTable;