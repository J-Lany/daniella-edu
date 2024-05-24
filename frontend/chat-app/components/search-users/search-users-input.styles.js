import "../common.css";

export const getSearchInputStyle = () => {
  return `
  <style>
  @import url('../common.css');

  .search {
    background: var(--light-gray-background);
    display: flex;
    padding-right: 1rem;
    align-items: center;
    gap: 1rem;
  }
  .search__input {
    flex-grow: 1;
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    background: var(--white-background);
    border-radius: 0.7rem;
  }

  .search-icon {
    pointer-events: none;
    opacity: 0.5;
  }

</style>
`;
};
