import { getHeaderComponentStyle } from "./header-component.styles";

export function createHeaderTemplate() {
  return `
    ${getHeaderComponentStyle()}
    <header class="header">
      <user-info-block class="user-info"></user-info-block>
      <logout-button class="logout"></logout-button>
    </header>
    `;
}
