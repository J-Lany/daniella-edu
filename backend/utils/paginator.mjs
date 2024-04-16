export function paginator(itemPerPage, pageNumber, list) {
  const startIndex = (pageNumber - 1) * itemPerPage;
  const lastIndex = startIndex + itemPerPage;
  const pageAmount = Math.ceil(list.length / itemPerPage);
  const hasNext = pageNumber < pageAmount;
  const hasPrev = pageNumber > 1;

  const result = list.slice(startIndex, lastIndex);
  return {
    result,
    pageAmount,
    itemPerPage,
    pageNumber,
    hasNext,
    hasPrev,
  };
}
