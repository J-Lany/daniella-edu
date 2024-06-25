import "../common.css";
export const getMessagesBlockStyle = () => {
  return `
  <style>
  @import url('../common.css');

  .messages{
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .empty-chat {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .empty-chat__img {
      max-width: 15rem;
  }

  .empty-chat__text {
    color: var(--gray-text-color);
    text-align: center;
    font-style: italic;
  }

  .right {
    place-self: flex-end;
  }

  </style>
  `;
};
