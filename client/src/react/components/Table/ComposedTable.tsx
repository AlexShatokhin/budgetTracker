import { CompactTable } from "@table-library/react-table-library/compact";
import {usePagination} from '@table-library/react-table-library/pagination';
import { useRowSelect } from "@table-library/react-table-library/select";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { colors } from "../../../constants/colors";

const data = [
	{
	  id: "1",
	  date: new Date('2025-02-13'),
	  description: 'Groceries',
	  amount: "- 50",
	  type: "EXPENSE",
	  category: 'Food',
	},
	{
	  id: "2",
	  date: new Date('2025-02-12'),
	  description: 'Rent',
	  amount: "- 1000",
	  type: "EXPENSE",
	  category: 'Housing',
	},
	{
	  id: "6",
	  date: new Date('2025-02-09'),
	  description: 'Salary',
	  amount: "+ 250",
	  type: "INCOME",
	  category: 'Work',
	},
	{
	  id: "3",
	  date: new Date('2025-02-11'),
	  description: 'Utilities',
	  amount: "- 150",
	  type: "EXPENSE",
	  category: 'Bills',
	},
	{
	  id: "4",
	  date: new Date('2025-02-10'),
	  description: 'Internet',
	  amount: "- 60",
	  type: "EXPENSE",
	  category: 'Bills',
	},
	{
	  id: "5",
	  date: new Date('2025-02-08'),
	  description: 'Gym Membership',
	  amount: "- 30",
	  type: "EXPENSE",
	  category: 'Health',
	},
	{
	  id: "7",
	  date: new Date('2025-02-07'),
	  description: 'Freelance Work',
	  amount: "+ 500",
	  type: "INCOME",
	  category: 'Work',
	},
	{
	  id: "8",
	  date: new Date('2025-02-06'),
	  description: 'Coffee',
	  amount: "- 5",
	  type: "EXPENSE",
	  category: 'Food',
	},
	{
	  id: "9",
	  date: new Date('2025-02-05'),
	  description: 'Movie Tickets',
	  amount: "- 20",
	  type: "EXPENSE",
	  category: 'Entertainment',
	},
	{
	  id: "10",
	  date: new Date('2025-02-04'),
	  description: 'Book',
	  amount: "- 15",
	  type: "EXPENSE",
	  category: 'Education',
	},
	{
	  id: "11",
	  date: new Date('2025-02-03'),
	  description: 'Dinner',
	  amount: "- 40",
	  type: "EXPENSE",
	  category: 'Food',
	},
	{
	  id: "12",
	  date: new Date('2025-02-02'),
	  description: 'Bus Ticket',
	  amount: "- 2.5",
	  type: "EXPENSE",
	  category: 'Transport',
	},
	{
	  id: "13",
	  date: new Date('2025-02-01'),
	  description: 'Concert',
	  amount: "- 75",
	  type: "EXPENSE",
	  category: 'Entertainment',
	},
	{
	  id: "14",
	  date: new Date('2025-01-31'),
	  description: 'Bonus',
	  amount: "+ 300",
	  type: "INCOME",
	  category: 'Work',
	},
	{
	  id: "15",
	  date: new Date('2025-01-30'),
	  description: 'Electricity Bill',
	  amount: "- 100",
	  type: "EXPENSE",
	  category: 'Bills',
	},
  ];
  
const ComposedTable = () => {
	const tableData = {nodes: data}
	const pagination= usePagination(tableData, {
		state: {
			page: 0,
			size: 10
		}
	});
	const select = useRowSelect(tableData);

	const COLUMNS = [
		{ 
			label: "Date", 
			renderCell: (item : any) => item.date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			}), 
			select: true 
		},
		{
		  label: "Description",
		  renderCell: (item : any) => item.description,
		},
		{ label: "Amount", 
			renderCell: (item : any) => item.amount 
		},
		{
		  label: "Category",
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