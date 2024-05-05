export const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      clearTimeout(timeoutId);
      return func(...args);
    }, delay);
  };
};
