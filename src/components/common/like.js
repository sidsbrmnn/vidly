import { cx } from '../../utils/cx';

const Like = ({ onClick, liked }) => {
  return (
    <i
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className={cx('fa', liked ? 'fa-heart' : 'fa-heart-o')}
      aria-hidden="true"
    />
  );
};

export default Like;
