import "../common.css";

export const getSearchInputStyle = () => {
  return `
  <style>
  @import url('../common.css');

  .search {
    background: var(--light-gray-background);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .search__input {
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    background: var(--white-background);
    border-radius: 2rem;
    min-width: 80%;
  }

  .search-icon {
    pointer-events: none;
    opacity: 0.5;
  }

</style>
`;
};
