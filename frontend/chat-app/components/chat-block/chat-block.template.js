import { getChatBlockStyle } from "./chat-block.styles";

export function createChatBlockTemplate() {
  return `
  ${getChatBlockStyle()}
  <div class="chat">
    <messages-block></messages-block>
    <message-input></message-input>
  </div>
  `;
}
