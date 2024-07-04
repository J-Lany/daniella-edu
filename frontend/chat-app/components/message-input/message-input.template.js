import { getMessageInputStyle } from "./message-input.styles";
import airplaneImg from "./../../accets/airplane.svg";

export function createMessageInputTemplate() {
  return `
  ${getMessageInputStyle()}
  <div class="message-input__block">
    <input class="message-input__input type="text" id="message" placeholder="Type something...">
    <div class="message-input__button">
      <img src=${airplaneImg} alt"airplane" class="message-input__img" />
    </div>
  </div>`;
}
