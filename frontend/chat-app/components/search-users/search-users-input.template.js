import { getSearchInputStyle } from "./search-users-input.styles";

export function createSearchInputTemplate() {
  return `
  ${getSearchInputStyle()}
  <div class="search">
    <input id="search" class="search__input" placeholder="поиск" type="text"/>
    <div class="search-icon">&#128269</div>
  </div>
  `;
}
