import { getChatComponentStyle } from "./chat-component.styles";

export function createChatTemplate() {
  return `
  ${getChatComponentStyle()}
  <div class="chat">
    <header-component></header-component>
    <message-sidebar></message-sidebar>
    <messages-block></messages-block>
  </div>
  `;
}
