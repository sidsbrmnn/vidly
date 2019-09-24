import PropTypes from 'prop-types';
import React from 'react';
import { cx } from '../../utils/cx';

const ListGroup = ({
  items,
  keyProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[keyProperty]}
          className={cx(
            'list-group-item',
            selectedItem &&
              item[keyProperty] === selectedItem[keyProperty] &&
              'active'
          )}
          onClick={() => onItemSelect(item)}
        >
          {item[valueProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  items: [],
  keyProperty: '_id',
  valueProperty: 'name',
  selectedItem: null,
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  keyProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired,
};

export default ListGroup;
