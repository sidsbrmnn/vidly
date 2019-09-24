export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export const get = (item, path) =>
  path.split('.').reduce((acc, key) => acc && acc[key], item);

export const orderBy = (items, iteratee, order = 'asc') =>
  [...items].sort((a, b) => {
    const valueA = get(a, iteratee);
    const valueB = get(b, iteratee);

    const orderFactor = order === 'asc' ? 1 : -1;
    if (valueA < valueB) return -1 * orderFactor;
    if (valueA > valueB) return 1 * orderFactor;
    return 0;
  });

export const range = (start, stop, step = 1) =>
  Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step
  );
