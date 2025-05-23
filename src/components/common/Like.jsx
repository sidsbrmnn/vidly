import clsx from 'clsx';

const Like = ({ onClick, liked }) => {
  return (
    <i
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className={clsx('bi', liked ? 'bi-heart-fill' : 'bi-heart')}
      aria-hidden="true"
    />
  );
};

export default Like;
