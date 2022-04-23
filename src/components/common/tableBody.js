import { get } from '../../utils/lodash';

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          {columns.map(column => (
            <td key={item._id + (column.path || column.key)}>
              {column.content ? column.content(item) : get(item, column.path)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
