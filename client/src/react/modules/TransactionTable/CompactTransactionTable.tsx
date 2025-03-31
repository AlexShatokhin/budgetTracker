import { useGetLatestTransactionsQuery } from "../../api/modules/transactionsApi";
import CompactTable from "../../components/Table/CompactTable";


const CompactTransactionTable = () => {
    const count = 5
    const {data, isLoading} = useGetLatestTransactionsQuery(count);
    const convertedData = data?.result.map((item) => ({id: item.id, date: new Date(item.date), description: item.note, amount: item.amount, category: item.category, type: item.type.toUpperCase()})) || [];
    console.log(data?.result)   

    const COLUMNS = [
        { label: 'Date', renderCell: (item: any) => item.date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')},
        { label: 'Description', renderCell: (item: any) => item.description },
        { label: 'Amount', renderCell: (item: any) => `${item.amount} $` },
        { label: 'Category', renderCell: (item: any) => item.category },
    ];

    return <CompactTable initialLoading={isLoading} count={count} data={convertedData} columns={COLUMNS} />
}

export default CompactTransactionTable;