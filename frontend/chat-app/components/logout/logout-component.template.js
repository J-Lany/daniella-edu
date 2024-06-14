import { getLogoutComponentStyle } from "./logout-component.styles";

export function createLogoutTemplate() {
  return `
    ${getLogoutComponentStyle()}
   <button class="logout">&#x2398;</button>
  `;
}
