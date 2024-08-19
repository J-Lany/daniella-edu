import "../common.css";
export const getMessagesBlockStyle = () => {
  return `
  <style>
  @import url('../common.css');

  @keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }

  .message-appear {
    opacity: 0;
    animation: fadeIn 1s ease forwards;
  }

  .messages {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 100%;
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
    padding-left: 1rem;
    padding-right: 1rem;
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