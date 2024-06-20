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
  const blockType = withAvatarBool ? "new-block" : "continue-block";

  const getAvatar = () => {
    return `<avatar-component display-mode="chat" user-id="${authorId}"></avatar-component>`;
  };

  const getMessageBody = () => {
    return ` <div class="message-block__body ${position}">
                <message-info user-id="${authorId}" time="${time}" position="${position}"></message-info>
                <div class="message-block__text message-block__${position}">${message}</div>
           </div>`;
  };

  const getLayout = () => {
    if (!withAvatarBool) {
      return `
      <div class="message-block__text next-message__${position}">${message}</div>
      `;
    }
    if (!isCurrentUserBool) {
      return `${getAvatar()}${getMessageBody()}`;
    } else {
      return `${getMessageBody()}${getAvatar()}`;
    }
  };

  return `
   ${getMessageStyle()}
    <div class="message-block ${position} ${blockType}">
      ${getLayout()}
    </div>
`;
}
