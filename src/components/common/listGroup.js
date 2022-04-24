import clsx from 'clsx';
import PropTypes from 'prop-types';

const ListGroup = ({
  items = [],
  keyProperty = '_id',
  valueProperty = 'name',
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[keyProperty]}
          className={clsx(
            'list-group-item',
            selectedItem &&
              item[keyProperty] === selectedItem[keyProperty] &&
              'active'
          )}
          onClick={() => onItemSelect(item)}
          role="button"
        >
          {item[valueProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  keyProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired,
};

export default ListGroup;
