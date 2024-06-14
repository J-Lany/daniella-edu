import { getLogoutComponentStyle } from "./logout-component.styles";

export function createLogoutTemplate() {
  return `
    ${getLogoutComponentStyle()}
   <button class="logout">&#9212; Logout</button>
  `;
}
