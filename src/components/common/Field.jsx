import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import FormControl from './FormControl';

function getClassName(type) {
  if (type === 'checkbox' || type === 'radio') {
    return 'form-check';
  }
}

function getLabelClassName(type) {
  if (type === 'checkbox' || type === 'radio') {
    return 'form-check-label';
  }

  return 'form-label';
}

const Field = ({
  className,
  floating = false,
  type,
  name,
  label,
  context,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const isCheckOrRadio = type === 'checkbox' || type === 'radio';

  const labelClass = floating ? undefined : getLabelClassName(type);

  return (
    <div
      className={clsx(
        getClassName(type),
        floating && 'form-floating',
        className
      )}
    >
      {!isCheckOrRadio && (
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
      )}
      <FormControl
        type={type}
        name={name}
        id={name}
        className={clsx(errors[name] && 'is-invalid')}
        {...register(name)}
        {...rest}
      />
      {isCheckOrRadio && (
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
      )}
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
