import { getMessagesBlockStyle } from "./messages-block.styles";

export function createMessagesBlockTemplate(messages) {
  return `
  ${getMessagesBlockStyle()}
  <div class="messages">
    ${
      messages?.message
        ? `<div>${messages.message}</div>`
        : messages
            .map((messageBlock) => {
              const messageBlockStr = JSON.stringify(messageBlock);
              return `
                 <messages-by-user  messages='${messageBlockStr}'></messages-by-user>
             `;
            })
            .join("")
    }
  </div>`;
}
