import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { loadItems, loadMoreItems } from '../../features/financeSlice.ts';
import { RootState } from '../../store.ts';
import { AppDispatch } from '../../store.ts';

const FinanceTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error, hasMore } = useSelector((state: RootState) => state.finance)
  const [ref, inView] = useInView()

  useEffect(() => {
    dispatch(loadItems())
  }, [dispatch])

useEffect(() => {
  if (inView && hasMore && !loading) {
    const timer = setTimeout(() => {
      dispatch(loadMoreItems())
    }, 500);
    return () => clearTimeout(timer)
  }
}, [inView, hasMore, loading, dispatch])

  const columns = React.useMemo<ColumnDef<any>[]>(() => [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'type', header: 'Type' },
  ], [])

  const data = React.useMemo(() => items, [items])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (loading && items.length === 0) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="overflow-x-auto relative h-[600px] overflow-y-auto">
      <table className="min-w-full border-collapse border border-slate-400">
        <thead className="sticky top-0 bg-white z-10">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="p-2 border border-slate-300"
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="p-2 border border-slate-300"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          <tr ref={ref}>
            <td colSpan={columns.length} className="p-4 text-center">
              {loading && 'Загрузка...'}
              {!hasMore && !loading && 'Все данные загружены'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default FinanceTable