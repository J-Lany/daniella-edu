import { getMessagesBlockStyle } from "./messages-block.styles";

export function createMessagesBlockTemplate(messages, currentUser) {
  return `
  ${getMessagesBlockStyle()}
  <div class="messages">
    ${
      messages?.message
        ? `<div>${messages.message}</div>`
        : messages
            .map(({ message, authorId, time }) => {
              const isCurrentUser = currentUser.userId === authorId;
              const position = isCurrentUser ? "right" : "left";

              return `
                 <message-component class="${position}" user-id="${authorId}" time="${time}" is-current-user="${isCurrentUser}" message="${message}"  display-mode="chat"></message-component>
             `;
            })
            .join("")
    }
  </div>`;
}
