import { getMessageStyle } from "./message.styles";

export function createMessageTemplate(
  message,
  time,
  authorId,
  displayMode,
  isCurrentUser
) {
  const isCurrentUserBool = isCurrentUser === "true" ? true : false;
  const position = isCurrentUserBool ? "right" : "left";

  const getAvatar = () => {
    return `<avatar-component display-mode=${displayMode} user-id="${authorId}"></avatar-component>`;
  };

  const getMessageBody = () => {
    return ` <div class="message-block__body">
    <message-info user-id="${authorId}" time="${time}"></message-info>
    ${message ? ` <div class="message-block__body">${message}</div>` : ""}
  </div>`;
  };

  const getLayout = () => {
    if (!isCurrentUserBool) {
      return `${getAvatar()}${getMessageBody()}`;
    } else {
      return `${getMessageBody()}${getAvatar()}`;
    }
  };

  return `
   ${getMessageStyle(displayMode, position)}
    <div class="message-block ${position}">
      ${getLayout()}
    </div>
`;
}
