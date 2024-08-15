import { getMessagesBlockStyle } from "./messages-block.styles";
import emptyChatImg from "./../../accets/empty-chat.png";


export function createMessagesBlockTemplate(messages) {
  return `
  ${getMessagesBlockStyle()}
  <div class="messages">
    ${
      !messages || messages?.message
        ? `<div class="empty-chat">
         <img class="empty-chat__img" src=${emptyChatImg} alt"emptyChat" />
         <p class="empty-chat__text">Начните разговор и отправьте первое сообщение, чтобы запустить интересный диалог!</p>
          </div>`
        : `<virtual-scroll buffer-size="10" class="virtual-scroll">${createSlots(messages)}</virtual-scroll>`
    }
  </div>`;
}

export const createSlots = (messages) => {
  return messages
    .map((messageBlock) => {
      const messageBlockStr = JSON.stringify(messageBlock);
      return `<messages-by-user>${messageBlockStr}</messages-by-user>`;
    })
    .join("");
};
