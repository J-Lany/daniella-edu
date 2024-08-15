import "../common.css";
export const getMessageInputStyle = () => {
  return `
  <style>
  @import url('../common.css');
  .message-input__block {
    display: flex;
    align-items: center;
    background-color: var(--light-gray-background);
    padding: 1rem;
  }
  
  .message-input__input {
    font-size: 1rem;
    border: none;
    padding: 1rem;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    width: 100%;
  }

  .message-input__button {
    background-color: var(--white-background);
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    padding: 1rem;
    border-left: solid 2px var(--light-gray-background);
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .message-input__button:hover {
    background-color: var(--blue-background);
  }

  .message-input__button:hover .message-input__img {
    filter: invert(1);
  }
  </style>
  `;
};
