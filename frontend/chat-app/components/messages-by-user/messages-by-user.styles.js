import "../common.css";
export const getMessagesByUserStyle = () => {
  return `
  <style>
  @import url('../common.css');

  .messages-by-user {
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  .right {
    place-self: flex-end;
  }

  </style>
  `;
};
