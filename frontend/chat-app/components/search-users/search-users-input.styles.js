import "../common.css";

export const getSearchInputStyle = () => {
  return `
  <style>
  @import url('../common.css');

  .search {
    background: var(--light-gray-background);
  }
  .search__input {
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    background: var(--white-background);
    border-radius: 2rem;
  }

</style>
`;
};
