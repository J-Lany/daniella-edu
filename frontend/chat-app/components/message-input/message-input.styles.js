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
  
  .message-input__input{
    font-size: 1rem;
    border: none;
    padding: 1rem;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    width: 100%;
  }

  .message-input__button{
    background-color: white;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    padding: 1rem;
    border-left: solid 2px var(--light-gray-background);
  }
  </style>
  `;
};
