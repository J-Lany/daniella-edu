import { getMessagesBlockStyle } from "./messages-block.styles";

export function createMessagesBlockTemplate(messages) {
  return `
  ${getMessagesBlockStyle()}
  <div class="messages">
    ${
      messages?.message
        ? `<div>${messages.message}</div>`
        : messages.map(({ message, authorId, time }) => {
            return `
      <message-component user-id="${authorId}" time="${time}" message="${message}" display-mode="chat"></message-component>
      `;
          })
    }
  </div>`;
}
