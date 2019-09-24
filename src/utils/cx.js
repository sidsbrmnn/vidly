export function cx(...args) {
  return args
    .filter(Boolean)
    .map(arg =>
      typeof arg === 'object'
        ? Object.keys(arg)
            .filter(key => arg[key])
            .join(' ')
        : arg
    )
    .join(' ');
}
