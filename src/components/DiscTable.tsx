import React from 'react';
import { useTable, TableInstance, Column } from 'react-table';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Disc } from '../../types'

const DiscTable: React.FC = () => {
  const discs = useSelector((state: RootState) => state.discs.discs);

// Define the type for DiscTable
type DiscTable = TableInstance<Disc>;

  const columns: Column<Disc>[] = React.useMemo(
    () => [
      {
        Header: 'Manufacturer',
        accessor: 'manufacturer',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Speed',
        accessor: 'speed',
      },
      {
        Header: 'Glide',
        accessor: 'glide',
      },
      {
        Header: 'Turn',
        accessor: 'turn',
      },
      {
        Header: 'Fade',
        accessor: 'fade',
      },

      {
        Header: 'Plastic',
        accessor: 'plastic',
      },
      {
        Header: 'Weight',
        accessor: 'weight',
      },
      {
        Header: 'Color',
        accessor: 'color',
        Cell: ({ value }: {value:string}) => (
          <div
            style={{
              backgroundColor: value,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              margin: 'auto',
            }}
          />
        ),
      },
    ],
    []
  );

  // Create a table instance
  const tableInstance = useTable({ columns, data: discs });

  // Extract required methods and data from the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()} className="table-auto w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="px-4 py-2 bg-gray-100">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="border px-4 py-2">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DiscTable;
