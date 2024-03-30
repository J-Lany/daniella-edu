import { getMessagesBlockStyle } from "./messages-block.styles";

export function createMessagesBlockTemplate(messages) {
  return `
  ${getMessagesBlockStyle()}
  <div class="messages">
    ${messages.map(({ author, message }) => {
      return `
      <div class="message-block">
        <avatar-component></avatar-component>
        <div class="message-block__body">
          <message-info></message-info>
          <div class="message-block__body">${message}</div>
        </div>
      </div>`;
    })}
  </div>`;
}
