import { getMessagesByUserStyle } from "./messages-by-user.styles";

export function createMessagesByUserTemplate(messages, currentUser) {
  const position =
    messages[0]?.authorId === currentUser?.userId ? "right" : "left";

  return `
  ${getMessagesByUserStyle()}
  <div class="messages-by-user ${position}">
    ${messages
      .map(({ message, authorId, time }, index) => {
        const withAvatarMessage = index === 0 ? true : false;
        const isCurrentUser = currentUser.userId === authorId;
        const isLastMessage = index === messages.length - 1;

        return `
                 <message-component 
                  class="${position}" 
                  user-id="${authorId}" 
                  time="${time}"
                  is-current-user="${isCurrentUser}" 
                  message="${message}" 
                  with-avatar="${withAvatarMessage}" 
                  display-mode="chat"
                  is-last="${isLastMessage}">
                  </message-component>
             `;
      })
      .join("")}
  </div>`;
}
