import { getMessagesBlockStyle } from "./messages-block.styles";
import emptyChatImg from "./../../accets/empty-chat.png";

export function createMessagesBlockTemplate(messages) {
  const createProps = (messages) => {
    return messages.map((messageBlock) => {
      return {
        payload: messageBlock,
      };
    });
  };
  const createSlot = (messages) => {
    return messages.map((messageBlock) => {
     const messageBlockStr= JSON.stringify(messages)
      return {
        payload: messageBlock,
      };
    });
  };

  return `
  ${getMessagesBlockStyle()}
  <div class="messages">
    ${
      !messages || messages?.message
        ? `<div class="empty-chat">
         <img class="empty-chat__img" src=${emptyChatImg} alt"emptyChat" />
         <p class="empty-chat__text">Начните разговор и отправьте первое сообщение, чтобы запустить интересный диалог!</p>
          </div>`
        : `<virtual-scroll component="messages-by-user" props='${JSON.stringify(createProps(messages))}'></virtual-scroll>`
    }
  </div>`;
}
