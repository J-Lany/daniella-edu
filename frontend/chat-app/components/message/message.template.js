import { getMessageStyle } from "./message.styles";

export function createMessageTemplate(
  message,
  time,
  authorId,
  displayMode,
  currentUserId
) {
  const position = currentUserId === authorId ? "right" : "left"

  return `
   ${getMessageStyle(displayMode)}
    <div class="message-block ${position}">
      <avatar-component display-mode=${displayMode} user-id="${authorId}"></avatar-component>
      <div class="message-block__body">
        <message-info user-id="${authorId}" time="${time}"></message-info>
        ${message ? ` <div class="message-block__body">${message}</div>` : ""}
      </div>
    </div>
`;
}
