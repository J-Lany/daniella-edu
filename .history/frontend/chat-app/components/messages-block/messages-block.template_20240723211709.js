import { getMessagesBlockStyle } from "./messages-block.styles";
import emptyChatImg from "./../../accets/empty-chat.png";

const MESSAGE_HEIGHT = 110

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
        : `<virtual-scroll class="virtual-scroll">${createSlots(messages)}</virtual-scroll>`
    }
  </div>`;
}

export const createSlots = (messages) => {
  //Вытащить кол-во элементов и умножить на логичное число, передавать далее 
  return messages
    .map((messageBlock) => {
      const messageBlockLength = messageBlock.length;
      const messageBlockHight = messageBlockLength * MESSAGE_HEIGHT;
      const messageBlockStr = JSON.stringify(messageBlock);
      return `<messages-by-user block-height='${messageBlockHight}' messages='${messageBlockStr}'></messages-by-user>`;
    })
    .join("");
};
