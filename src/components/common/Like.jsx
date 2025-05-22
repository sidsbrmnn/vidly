import clsx from 'clsx';

const Like = ({ onClick, liked }) => {
  return (
    <i
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className={clsx('fa', liked ? 'fa-heart' : 'fa-heart-o')}
      aria-hidden="true"
    />
  );
};

export default Like;
