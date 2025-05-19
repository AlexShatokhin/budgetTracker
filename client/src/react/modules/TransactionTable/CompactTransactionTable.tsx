import { useEffect } from "react";
import { useGetLatestTransactionsQuery } from "../../api/modules/transactionsApi";
import CompactTable from "../../components/Table/CompactTable";
import useStorage from "../../hooks/useStorage";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const CompactTransactionTable = () => {
    const count = 5
    const {data, isLoading} = useGetLatestTransactionsQuery(count);
    const convertedData = data?.result.map((item) => ({id: item.id, date: new Date(item.date), description: item.note, amount: item.amount, category: item.category, type: item.type.toUpperCase()})) || [];
    const currency = useStorage().getItem("currency") || "USD";
    const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₽";
    const {width} = useWindowDimensions();
    const isSmallMonitor = width < 1300;
    useEffect(() => {
        console.log("Width changed:", width);
    }, [width])

    const COLUMNS = [
        { label: 'Date', renderCell: (item: any) => {
            if(isSmallMonitor){
                const date = item.date;
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = String(date.getFullYear()).slice(-2);
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                return `${day}/${month}/${year} ${hours}:${minutes}`;
            } else {
                return item.date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '');
            }
        }},
        { label: 'Description', renderCell: (item: any) => {
            if(isSmallMonitor){
                return item.description.length > 10 ? item.description.slice(0, 10) + "..." : item.description;
            } else {
                return item.description;
            }
        } },
        { label: 'Amount', renderCell: (item: any) => `${item.amount} ${currencySymbol}` },
        { label: 'Category', renderCell: (item: any) => item.category },
    ];

    return <CompactTable initialLoading={isLoading} count={count} data={convertedData} columns={COLUMNS} />
}

export default CompactTransactionTable;