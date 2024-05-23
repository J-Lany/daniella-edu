import { getToastComponentStyle } from "./toast-component.styles";

export const TOAST_SYMBOLS = {
  sucsess: "&#9745;",
  error: "&#9746;",
};

export function createToastComponentTemplate(type, message) {
  return `
  ${getToastComponentStyle(type)}
  <div class="toast">
    <div class="toast__symbol">${TOAST_SYMBOLS[type]}</div>
    <div class="toast__text">${message}</div>
    <button class="toast__button">&times;</button>
  </div>
  `;
}
