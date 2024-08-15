import { getMessagesByUserStyle } from "./messages-by-user.styles";

export function createMessagesByUserTemplate(messages, currentUser) {

  if(!messages || !currentUser) {
    return '';
  }
  const position =
    messages[0]?.authorId === currentUser?.userId ? "right" : "left";

  return `
  ${getMessagesByUserStyle()}
  <div class="messages-by-user ${position}">
    ${messages
      .map(({ messageBody, authorId, createDate }, index) => {
        const withAvatarMessage = index === 0;
        const isCurrentUser = currentUser?.userId === authorId;
        const isLastMessage = index === messages.length - 1;
        const date = new Date(createDate);
        const time = `${date.getHours()}:${date.getMinutes()}`;

        return `
                 <message-component 
                  class="${position}" 
                  user-id="${authorId}" 
                  time="${time}"
                  is-current-user="${isCurrentUser}" 
                  message="${messageBody}" 
                  with-avatar="${withAvatarMessage}" 
                  display-mode="chat"
                  is-last="${isLastMessage}">
                  </message-component>
             `;
      })
      .join("")}
  </div>`;
}
