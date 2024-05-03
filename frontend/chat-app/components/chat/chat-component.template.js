import { getChatComponentStyle } from "./chat-component.styles";

export function createChatTemplate() {
  return `
  ${getChatComponentStyle()}
  <div class="chat">
    <header-component></header-component>
    <sidebar-component></sidebar-component>
    <chat-block></chat-block>
  </div>
  `;
}
