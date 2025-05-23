import clsx from 'clsx';
import range from 'lodash/range';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  const pages = range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={clsx('page-item', page === currentPage && 'active')}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
