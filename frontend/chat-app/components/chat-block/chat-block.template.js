import { getChatBlockStyle } from "./chat-block.styles";

export function createChatBlockTemplate(messages) {
  if (!messages) {
    return `
    <div class="messages">
      Упс... тут ничего нет. Нажмите на + и выберите с кем хотите переписываться
    </div>`;
  }
  return `
  ${getChatBlockStyle()}
  <div class="chat">
    <messages-block></messages-block>
    <message-input></message-input>
  </div>
  `;
}
