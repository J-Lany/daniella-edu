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

  .right {
    place-self: flex-end;
  }

  </style>
  `;
};
