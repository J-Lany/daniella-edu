import { getSearchInputStyle } from "./search-users-input.styles";

export function createSearchInputTemplate(value) {
  const inputValue = value ? value : "";
  return `
  ${getSearchInputStyle()}
  <div class="search">
      <input id="search" value=${inputValue} class="search__input" placeholder="&#128269 поиск" type="text"/>
  </div>
  `;
}
