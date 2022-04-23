import { cx } from '../../utils/cx';

const Input = ({ className, name, label, error, ...rest }) => {
  return (
    <div className={cx('form-group', className)}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        className={cx('form-control', error && 'is-invalid')}
        placeholder={label}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Input;
