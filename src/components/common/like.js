import { cx } from '../../utils/cx';

const Like = props => {
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: 'pointer' }}
      className={cx('fa', props.liked ? 'fa-heart' : 'fa-heart-o')}
      aria-hidden="true"
    />
  );
};

export default Like;
