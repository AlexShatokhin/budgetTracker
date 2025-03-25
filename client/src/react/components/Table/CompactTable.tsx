import { FC } from 'react';
import { Table, Header, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import "./table.scss"
import { TransactionTableItem } from '../../modules/Transactions/TrasactionTableItemType';
import { AmountType } from '../../types/amountType';

type CompactTableProps = {
  data: TransactionTableItem[],
  columns : {label: string, renderCell: (item: any) => any}[],
  initialLoading?: boolean,
  count?: number 
}

const CompactTable: FC<CompactTableProps> = ({data, columns, initialLoading, count}) => {
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
              {columns.map((column) => (
                <Cell key={column.label}>{column.label}</Cell>
              ))}
            </Row>
          </Header>

          <Body>
            {
              initialLoading ? 
              new Array(count).fill(0).map((item, index) => (
                <Row item={item} key={index}>
                  {columns.map((column) => (
                    <Cell key={column.label}><Skeleton style={{width: 70}}/></Cell>
                  ))}
                </Row>
              )) : null
            }
            {tableList.map((item: any) => (
              <Row item={item} key={item.id}>
                {columns.map((column) => {
                  return (
                    item.type === AmountType.INCOME ?
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

export default CompactTable;