import { getChatBlockStyle } from "./chat-block.styles";

export function createChatBlockTemplate(messages) {
  if (!messages) {
    return `
    ${getChatBlockStyle()}
    <div class="chat chat-empty">
      Упс... тут ничего нет. Нажмите на 'поиск' и выберите с кем хотите переписываться
    </div>`;
  }
  return `
  ${getChatBlockStyle()}
  <div class="chat chat-block">
    <messages-block class="messages-block"></messages-block>
    <message-input class="messages-input"></message-input>
  </div>
  `;
}
