import React, { useEffect, useState } from 'react';
import { useTable, TableInstance, Column } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Disc } from '../../types'
import { openModal } from '../redux/reducers/openModalSlice';

const DiscTable: React.FC = () => {
  const discs = useSelector((state: RootState) => state.discs.discs);
  const [filter, setFilter] = useState('')
  const [tableDiscs, setTableDiscs] = useState<Disc[]>([])
  const dispatch = useDispatch();

  useEffect(() => {
    let filtered = discs.filter((disc) => {
      let regex = new RegExp(filter, 'i');
      return regex.test(disc.name + disc.manufacturer + disc.plastic + disc.type)
    });
    setTableDiscs(filtered)
  }, [filter,discs]);


  const writeFilter = (e: any) => setFilter(e.target.value)

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
        Header: 'Type',
        accessor: 'type'
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
        Cell: ({ value }: { value: string }) => (
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
  const tableInstance = useTable({ columns, data: tableDiscs });

  // Extract required methods and data from the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <div className=''>
        <input
          type="text"
          placeholder="Filter discs"
          value={filter}
          onChange={(e) => { writeFilter(e) }}
          className="mb-4"
        />
      </div>
      <table {...getTableProps()} className="table-auto w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-4 py-2 bg-gray-200">
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
              <tr {...row.getRowProps()}
                className="border px-4 py-2 bg-gray-100"
                key={row.original.name+row.original.color}
                onClick={() => {
                  const disc = row.original;
                  dispatch(openModal({type:'edit', edit: disc}));
                }}
              >

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
    </>
  );
};

export default DiscTable;
