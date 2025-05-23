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
    <div className="list-group">
      {items.map(item => (
        <button
          key={item[keyProperty]}
          type="button"
          className={clsx(
            'list-group-item list-group-item-action',
            selectedItem &&
              item[keyProperty] === selectedItem[keyProperty] &&
              'active'
          )}
          onClick={() => onItemSelect(item)}
          aria-current={
            selectedItem && item[keyProperty] === selectedItem[keyProperty]
              ? 'true'
              : undefined
          }
        >
          {item[valueProperty]}
        </button>
      ))}
    </div>
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
