import { CompactTable } from "@table-library/react-table-library/compact";
import {usePagination} from '@table-library/react-table-library/pagination';
import { useRowSelect } from "@table-library/react-table-library/select";
import { FaCalendar, FaChevronLeft, FaChevronRight, FaMoneyBillWave } from "react-icons/fa";
import { BsChatSquareTextFill } from "react-icons/bs";
import { FiTable } from "react-icons/fi";
import { colors } from "../../../constants/colors";
import { useGetTransactionsQuery } from "../../api/modules/transactionsApi";

const ComposedTable = () => {
	const {data} = useGetTransactionsQuery();
	const convertedData = data?.result?.map((item : any) => ({id: item.id, date: new Date(item.date), description: item.note, amount: item.amount, category: item.category})) || [];
	
	const tableData = {nodes: convertedData}
	const select = useRowSelect(tableData);
	const pagination= usePagination(tableData, {
		state: {
			page: 0,
			size: 10
		}
	});

	console.log(convertedData);

	const COLUMNS = [
		{ 
			label: <span><FaCalendar /> Date</span>, 
			renderCell: (item : any) => item.date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			}), 
			select: true 
		},
		{
		  label: <span><BsChatSquareTextFill /> Description</span> ,
		  renderCell: (item : any) => item.description,
		},
		{ label: <span><FaMoneyBillWave /> Amount</span>, 
			renderCell: (item : any) => item.amount + " $" 
		},
		{
		  label: <span><FiTable /> Category</span> ,
		  renderCell: (item : any) => item.category,
		},
	  ];
  return (
		<div className="table-container">
			<CompactTable
				columns={COLUMNS}
				data={tableData} 
				pagination={pagination}
				select={select}
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