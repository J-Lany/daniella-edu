import { getChatBlockStyle } from "./chat-block.styles";

export function createChatBlockTemplate(messages) {
  if (!messages) {
    return `
    ${getChatBlockStyle()}
    <div class="chat-empty">
      Упс... тут ничего нет. Нажмите на <span class="chat-plus">+</span> и выберите с кем хотите переписываться
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
