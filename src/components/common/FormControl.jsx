import clsx from 'clsx';

function getClassName(type) {
  switch (type) {
    case 'select':
      return 'form-select';
    case 'checkbox':
    case 'radio':
      return 'form-check-input';
    case 'range':
      return 'form-range';
    default:
      return 'form-control';
  }
}

const FormControl = ({ type = 'text', className, ...rest }) => {
  let C;
  switch (type) {
    case 'select':
      C = 'select';
      break;
    case 'textarea':
      C = 'textarea';
      break;
    default:
      C = 'input';
  }

  const showType = C === 'input';

  return (
    <C
      {...(showType ? { type } : {})}
      className={clsx(getClassName(type), className)}
      {...rest}
    />
  );
};

export default FormControl;
