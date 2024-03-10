import "../common.css";

const getLoginComponentStyle = () => {
  return `
  <style>
    @import url('../common.css');

    .login-form {
      display: flex;
      flex-flow: column;
      gap: 1rem;
    }
    .login-form__input {
      font-size: 1rem;
      padding: 1rem;
      border: none;
      background: var(--light-gray-background);
      border-radius: 0.5rem;
    }
    .login-form__btn {
      padding: 0.5rem 3.5rem;
      outline: none;
      border: 1px solid var(--light-gray-background);
      border-radius: 0.3rem;
      font-size: 1rem;
      color: var(--gray-text-color);
      background-color: var(--light-gray-background);
      box-shadow: 0 1px 3px var(--gray-text-color);
    }
    .login-form__btn:active {
      background-color: var(--light-gray-color);
    }
    .login-form__btn-group {
      display: flex;
      justify-content: space-between;
    }
    .login-form__btn:hover {
      background-color: var(--light-blue-background)
    }
  </style>
  `;
};

export { getLoginComponentStyle };
