import "../common.css";
export const getMessagesBlockStyle = () => {
  return `
  <style>
  @import url('../common.css');

  .messages{
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .right {
    place-self: flex-end;
  }

  .left {
    
  }

  </style>
  `;
};
