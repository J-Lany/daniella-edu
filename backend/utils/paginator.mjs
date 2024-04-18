export function paginator(itemPerPage, pageNumber, list) {
  const itemPerPageInt = parseInt(itemPerPage);
  const pageNumberInt = parseInt(pageNumber);

  const startIndex = (pageNumberInt - 1) * itemPerPageInt;
  const lastIndex = startIndex + itemPerPageInt;
  const pageAmount = Math.ceil(list.length / itemPerPageInt);
  const hasNext = pageNumberInt < pageAmount;
  const hasPrev = pageNumberInt > 1;

  const result = list.slice(startIndex, lastIndex);
  return {
    result,
    pageAmount,
    itemPerPageInt,
    hasNext,
    hasPrev,
  };
}
