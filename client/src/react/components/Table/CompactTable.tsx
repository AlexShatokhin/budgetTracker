import { FC } from 'react';
import { Table, Header, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';


import "./table.scss"
const data = [
  {
    id: 1,
    date: new Date('2025-02-13'),
    description: 'Groceries',
    amount: "- 50",
    type: "EXPENSE",
    category: 'Food',
  },
  {
    id: 2,
    date: new Date('2025-02-12'),
    description: 'Rent',
    amount: "- 1000",
    type: "EXPENSE",
    category: 'Housing',
  },
  {
    id: 6,
    date: new Date('2025-02-09'),
    description: 'Salary',
    amount: "+ 250",
    type: "INCOME",
    category: 'Work',
  },
  {
    id: 3,
    date: new Date('2025-02-11'),
    description: 'Utilities',
    amount: "- 150",
    type: "EXPENSE",
    category: 'Bills',
  },
  {
    id: 4,
    date: new Date('2025-02-10'),
    description: 'Internet',
    amount: "- 60",
    type: "EXPENSE",
    category: 'Bills',
  },

];

const COLUMNS = [
  { label: 'Date', renderCell: (item: any) => item.date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')},
  { label: 'Description', renderCell: (item: any) => item.description },
  { label: 'Amount', renderCell: (item: any) => `${item.amount} $` },
  { label: 'Category', renderCell: (item: any) => item.category },
];

const TransactionCompactTable: FC = () => {
  const theme = useTheme({
    Table: `
      --data-table-library_grid-template-columns: 1fr 2fr 1fr 1fr;
    `,
  });

  return (
    <Table data={{ nodes: data }} theme={theme}>
      {(tableList: any) => (
        <>
          <Header>
            <Row item={{ id: 'header' }}>
              {COLUMNS.map((column) => (
                <Cell key={column.label}>{column.label}</Cell>
              ))}
            </Row>
          </Header>

          <Body>
            {tableList.map((item: any) => (
              <Row item={item} key={item.id}>
                {COLUMNS.map((column) => {
                  return (
                    item.type === "INCOME" ?
                  <Cell key={column.label}><span className='income'>{column.renderCell(item)}</span></Cell> :
                  <Cell key={column.label}>{column.renderCell(item)}</Cell>
                )
                })}
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default TransactionCompactTable;