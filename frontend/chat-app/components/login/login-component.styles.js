import "../common.css";

const getLoginComponentStyle = () => {
  return `
  <style>
    @import url('../common.css');

    .login-page{
      max-width: 80rem;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
    .login-form {
      display: flex;
      flex-flow: column;
      gap: 1rem;
    }
    .login-form__input {
      font-size: 1.5rem;
      padding: 1.5rem;
      border: none;
      background: var(--light-gray-background);
      border-radius: 0.5rem;
    }
    .login-form__btn {
      padding: 1rem;
      width: 50%;
      font-size: 1.5rem;
      outline: none;
      border: 1px solid var(--light-gray-background);
      border-radius: 0.3rem;
      color: var(--gray-text-color);
      background-color: var(--light-gray-background);
      box-shadow: 0 1px 3px var(--gray-text-color);
    }
    .login-form__btn:active {
      background-color: var(--light-gray-color);
    }
    .login-form__btn-group {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }
    .login-form__btn:hover {
      background-color: var(--light-blue-background)
    }
    .error-messsge{
      color: red;
      margin-top: 0.5rem;
      text-align: center;
    }
    @media screen and (max-width: 600px) {
      .login-form__btn {
          padding: 0.75rem 3.5rem;
          font-size: 1rem;
          width: auto;
        }
      .login-form__btn-group {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 1rem;
      }
      .login-form__input {
        font-size: 1rem;
        padding: 1rem;
      }
      .error-messsge{
        margin-top: 0.25rem;
      }
    }
  </style>
  `;
};

export { getLoginComponentStyle };
