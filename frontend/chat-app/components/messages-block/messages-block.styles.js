import "../common.css";
export const getMessagesBlockStyle = () => {
  return `
  <style>
  @import url('../common.css');

  .messages{
    padding: 1rem;
  }
  .message-block{
    display: flex;
    gap: 1rem;
    align-items: center;
    font-family: inter;
    font-size: 0.75rem;
  }

  .message-block__avatar{
    background-color: var(--light-gray-background);
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 3.2rem;
  }

  .message-block__body{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .message-block__name{
    font-weight: bold;
    font-size: 1.25rem;
  }

  .message-block__body{
    text-align: left;
  }
  
  </style>
  `;
};
