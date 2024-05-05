import { getChatBlockStyle } from "./chat-block.styles";

export function createChatBlockTemplate(messages) {
  if (!messages) {
    return `
    ${getChatBlockStyle()}
    <div class="chat-empty">
      Упс... тут ничего нет. Нажмите на '&#128269 поиск' и выберите с кем хотите переписываться
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
