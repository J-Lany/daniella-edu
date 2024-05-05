import { getSearchInputStyle } from "./search-users-input.styles";

export function createSearchInputTemplate() {
  return `
  ${getSearchInputStyle()}
  <div class="search">
      <input id="search" class="search__input" placeholder="&#128269 поиск" type="text"/>
  </div>
  `;
}
