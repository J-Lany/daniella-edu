import { getChatComponentStyle } from "./chat-component.styles";

export function createChatTemplate() {
  return `
  ${getChatComponentStyle()}
  <div class="chat">
    <header-component></header-component>
    <messages-block></messages-block>
    <message-input></message-input>
  </div>
  `;
}
