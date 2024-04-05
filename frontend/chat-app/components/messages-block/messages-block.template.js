import { getMessagesBlockStyle } from "./messages-block.styles";

export function createMessagesBlockTemplate(messages) {
  if (messages == null) {
    return `
    <div class="messages">
      Упс... тут ничего нет. Нажмите на + и выберите с кем хотите переписываться
    </div>`;
  }
  return `
  ${getMessagesBlockStyle()}
  <div class="messages">
    ${messages.map(({ message, authorId, time }) => {
      return `
      <message-component user-id="${authorId}" time="${time}" message="${message}" display-mode="chat"></message-component>
      `;
    })}
  </div>`;
}
