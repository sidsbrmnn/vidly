import clsx from 'clsx';

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const handleSort = path => {
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    onSort(sortColumn);
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
                  'ml-2 fa',
                  sortColumn.order === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'
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
