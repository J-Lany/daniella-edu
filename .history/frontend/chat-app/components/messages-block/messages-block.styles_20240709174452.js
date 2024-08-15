import "../common.css";
export const getMessagesBlockStyle = () => {
  return `
  <style>
  @import url('../common.css');

  @keyframes fadeIn {
    @keyframes slideInFromBottom {
      from {
          transform: translateY(100%);
      }
      to {
          transform: translateY(0);
      }
  }
  
  .message-appear {
      animation: slideInFromBottom 0.5s ease forwards;
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
