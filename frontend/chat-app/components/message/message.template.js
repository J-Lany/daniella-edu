import { getMessageStyle } from "./message.styles";

export function createMessageTemplate(
  message,
  time,
  authorId,
  isCurrentUser,
  withAvatar
) {
  const isCurrentUserBool = isCurrentUser === "true" ? true : false;
  const withAvatarBool = withAvatar === "true" ? true : false;
  const position = isCurrentUserBool ? "right" : "left";

  const getAvatar = () => {
    return `<avatar-component display-mode="chat" user-id="${authorId}"></avatar-component>`;
  };

  const getMessageBody = () => {
    return ` <div class="message-block__body">
              <message-info user-id="${authorId}" time="${time}"></message-info>
              <div class="message-block__text">${message}</div>
           </div>`;
  };

  const getLayout = () => {
    if (!withAvatarBool) {
      return `${getMessageBody()}`;
    }
    if (!isCurrentUserBool) {
      return `${getAvatar()}${getMessageBody()}`;
    } else {
      return `${getMessageBody()}${getAvatar()}`;
    }
  };

  return `
   ${getMessageStyle(position)}
    <div class="message-block ${position}">
      ${getLayout()}
    </div>
`;
}
