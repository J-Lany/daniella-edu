import { getToastComponentStyle } from "./toast-component.styles";

export function createToastComponentTemplate(type, message) {
  return `
  ${getToastComponentStyle(type)}
  <div class="toast">
    <div class="toast__text">${message}</div>
    <button class="toast__button">&times;</button>
  </div>
  `;
}
