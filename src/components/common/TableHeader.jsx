import clsx from 'clsx';

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const handleSort = path => {
    const order =
      sortColumn.path === path
        ? sortColumn.order === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';

    onSort({ path, order });
  };

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            role={column.path ? 'button' : null}
            onClick={column.path ? () => handleSort(column.path) : null}
          >
            {column.label}
            {column.path === sortColumn.path && (
              <i
                className={clsx(
                  'ms-2 bi',
                  sortColumn.order === 'asc' ? 'bi-sort-down' : 'bi-sort-up'
                )}
                aria-hidden="true"
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
