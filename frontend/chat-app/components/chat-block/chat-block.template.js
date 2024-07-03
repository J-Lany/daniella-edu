import { getChatBlockStyle } from "./chat-block.styles";
import emptyFriendsImg from "./../../accets/empty-friends.png";

export function createChatBlockTemplate(messages) {
  if (!messages) {
    return `
    ${getChatBlockStyle()}
    <div class="chat chat-empty">
      <img class="chat-empty__img" src=${emptyFriendsImg} alt="emptyChat" />
      <p class="chat-empty__text">Упс... здесь ничего нет. Нажмите на 'поиск' и выберите с кем хотите пообщаться</p>
    </div>`;
  }
  return `
  ${getChatBlockStyle()}
  <div class="chat chat-block">
    <messages-block class="messages-block"></messages-block>
    <message-input class="messages-input"></message-input>
  </div>
  `;
}
