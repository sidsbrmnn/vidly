import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { cx } from '../../utils/cx';

const Field = ({ className, type, name, label, context, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const isSelect = type === 'select';
  const C = isSelect ? 'select' : 'input';

  return (
    <div className={cx('form-group', className)}>
      <label htmlFor={name}>{label}</label>
      <C
        {...(isSelect ? {} : { type })}
        name={name}
        id={name}
        className={cx('form-control', errors[name] && 'is-invalid')}
        {...register(name)}
        {...rest}
      />
      {errors[name] && (
        <div className="invalid-feedback">{errors[name].message}</div>
      )}
    </div>
  );
};

Field.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default Field;
