import { getMessagesBlockStyle } from "./messages-block.styles";
const MOC_MESSAGES = [
  {
    id: 1,
    message: "Hello, Como estas",
    time: "11:11",
    authorId: 1,
    content: {
      type: "text",
      data: "Hello, Como estas",
    },
  },
  {
    id: 2,
    message: "Hello, Como estas",
    time: "11:12",
    authorId: 1,
    content: {
      type: "text",
      data: "Hello, Estoy bien",
    },
  },
  {
    id: 3,
    message: "Hello, Como estas",
    time: "11:13",
    authorId: 1,
    content: {
      type: "text",
      data: "What's uuuuuup",
    },
  },
];
export function createMessagesBlockTemplate(messages) {
  if (messages == null) {
    // return `
    // <div class="messages">
    //   Упс... тут ничего нет. Нажмите на + и выберите с кем хотите переписываться
    // </div>`;
    messages = MOC_MESSAGES;
  }
  return `
  ${getMessagesBlockStyle()}
  <div class="messages">
    ${messages.map(({ message, authorId, time }) => {
      return `
      <message-component user-id="${authorId}" time="${time}" message="${message}"></message-component>
      `;
    })}
  </div>`;
}
