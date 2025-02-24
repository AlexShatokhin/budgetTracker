import React, { FC } from 'react';
import { Table, Header, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';

const data = [
  {
    id: 1,
    date: new Date('2025-02-13'),
    description: 'Groceries',
    amount: "- 50",
    category: 'Food',
  },
  {
    id: 2,
    date: new Date('2025-02-12'),
    description: 'Rent',
    amount: "- 1000",
    category: 'Housing',
  },
  {
    id: 3,
    date: new Date('2025-02-11'),
    description: 'Utilities',
    amount: "- 150",
    category: 'Bills',
  },
  {
    id: 4,
    date: new Date('2025-02-10'),
    description: 'Internet',
    amount: "- 60",
    category: 'Bills',
  },
  {
    id: 5,
    date: new Date('2025-02-09'),
    description: 'Transport',
    amount: "- 30",
    category: 'Transport',
  },
  {
    id: 5,
    date: new Date('2025-02-09'),
    description: 'Salary',
    amount: "+ 250",
    category: 'Work',
  },
];

const COLUMNS = [
  { label: 'Date', renderCell: (item: any) => item.date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) },
  { label: 'Description', renderCell: (item: any) => item.description },
  { label: 'Amount', renderCell: (item: any) => `${item.amount} $` },
  { label: 'Category', renderCell: (item: any) => item.category },
];

const TransactionTable: FC = () => {
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
                {COLUMNS.map((column) => (
                  <Cell key={column.label}>{column.renderCell(item)}</Cell>
                ))}
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default TransactionTable;