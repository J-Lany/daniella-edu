import "../common.css";

export const getSearchInputStyle = () => {
  return `
  <style>
  @import url('../common.css');

  .search {
    background: var(--white-background);
  }
  .search__input {
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    background: var(--light-gray-background);
    border-radius: 2rem;
  }

</style>
`;
};
