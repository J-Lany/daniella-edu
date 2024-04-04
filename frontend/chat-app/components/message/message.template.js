import { getMessageStyle } from "./message.styles";

export function createMessageTemplate(message, time, authorId) {
  return `
   ${getMessageStyle()}
    <div class="message-block">
      <avatar-component user-id="${authorId}"></avatar-component>
      <div class="message-block__body">
        <message-info user-id="${authorId}" time="${time}"></message-info>
       <div class="message-block__body">${message}</div>
      </div>
    </div>
`;
}
