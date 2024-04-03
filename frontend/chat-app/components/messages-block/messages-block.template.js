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
    ${messages.map(({ message, id, time }) => {
      return `
      <div class="message-block">
        <avatar-component user-id="${id}></avatar-component>
        <div class="message-block__body">
          <message-info user-id="${id}" time="${time}"></message-info>
          <div class="message-block__body">${message}</div>
        </div>
      </div>`;
    })}
  </div>`;
}
