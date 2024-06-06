import React, { useEffect, useState } from 'react';
import { useTable, TableInstance, Column } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Bag } from '../../types'
import { openModal } from '../redux/reducers/openModalSlice';
import { takeCoverage } from 'v8';

const MenuTable: React.FC = () => {
  const menu = useSelector((state: RootState) => state.menu.menu);
  const [filter, setFilter] = useState('')
  const [menuTable, setMenuTable] = useState<Bag[]>([])
  const dispatch = useDispatch();

  useEffect(() => {
    let filtered = menu.filter((bag) => {
      let regex = new RegExp(filter, 'i');
      return regex.test(bag.name + bag.price + bag.hmid + bag.strain + bag.weight)
    });
    setMenuTable(filtered)
  }, [filter,menu]);


  const writeFilter = (e:{target:{value:string}}) => setFilter(e.target.value)

  type Table = TableInstance<Bag>;

  const columns: Column<Bag>[] = React.useMemo(
    () => [
      {
        Header: 'Hash Maker',
        accessor: 'hmid',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Weight',
        accessor: 'weight'
      },
      {
        Header: 'Strain',
        accessor: 'strain',
      },
      {
        Header: 'Notes',
        accessor: 'notes',
      },
      {
        Header: 'Picture',
        accessor: 'pic',
      },
      {
        Header: 'Tag',
        accessor: 'tag'
      }
    ],
    []
  );

  const tableInstance = useTable({ columns, data: menu });

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
                key={row.original.name+row.original.tag}
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

export default MenuTable;
