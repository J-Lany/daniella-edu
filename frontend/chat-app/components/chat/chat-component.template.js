import { getChatComponentStyle } from "./chat-component.styles";

export function createChatTemplate() {
  return `
  ${getChatComponentStyle()}
  <div class="chat">
    <header-component></header-component>
    <chat-sidebar></chat-sidebar>
    <chat-block></chat-block>
  </div>
  `;
}
