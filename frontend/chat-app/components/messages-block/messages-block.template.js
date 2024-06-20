import { getMessagesBlockStyle } from "./messages-block.styles";

export function createMessagesBlockTemplate(messages, currentUser) {
  let prevUserId;
  return `
  ${getMessagesBlockStyle()}
  <div class="messages">
    ${
      messages?.message
        ? `<div>${messages.message}</div>`
        : messages
            .map(({ message, authorId, time }) => {
              const withAvatarMessage = prevUserId === authorId ? false : true;
              const isCurrentUser = currentUser.userId === authorId;
              const position = isCurrentUser ? "right" : "left";
              
              prevUserId = authorId

              return `
                 <message-component class="${position}" user-id="${authorId}" time="${time}" is-current-user="${isCurrentUser}" message="${message}" with-avatar=${withAvatarMessage} display-mode="chat"></message-component>
             `;
            })
            .join("")
    }
  </div>`;
}
