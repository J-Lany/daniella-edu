import { getHeaderComponentStyle } from "./header-component.styles";

export function createHeaderTemplate() {
  return `
    ${getHeaderComponentStyle()}
    <header class="header">
      <user-info-block></user-info-block>
    </header>
    `;
}
