import { getChatComponentStyle } from "./chat-component.styles";

export function createChatTemplate() {
  return `
  ${getChatComponentStyle()}
  <div class="chat">
    <header-component class="header"></header-component>
   <div class="chat-wrapper">
   <sidebar-component class="sidebar"></sidebar-component>
   <chat-block class="chat-block"></chat-block>
   </div>
  </div>
  `;
}
