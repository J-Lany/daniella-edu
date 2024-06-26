import "../common.css";

export const getSearchInputStyle = () => {
  return `
  <style>
  @import url('../common.css');

  .search {
    background: var(--light-gray-background);
    display: flex;
    padding-right: 1rem;
    padding-left: 1px;
    padding-top: 1px;
    align-items: center;
    gap: 1rem;
    z-index: 1;
    position: relative;
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
