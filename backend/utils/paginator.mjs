export function paginator(itemPerPage, pageNumber, list) {
  const startIndex = (pageNumber - 1) * itemPerPage;
  const lastIndex = startIndex + itemPerPage;

  const result = list.slice(startIndex, lastIndex);
  return result;
}
