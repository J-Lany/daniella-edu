import "../common.css";

const getLoginComponentStyle = () => {
  return `
  <style>
    @import url('../common.css');

    .login-page {
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
      font-size: 1rem;
      padding: 1rem;
      min-width: 20rem;
      border: none;
      background: var(--light-gray-background);
      box-shadow: inbox 0 0 0.5rem rgba(0, 0, 0, 0.2);
      border-radius: 0.5rem;
    }

    .login-form__btn {
      padding: 0.75rem;
      min-width: 22rem;
      font-size: 1rem;
      border: 1px solid var(--light-blue-background);
      background: var(--light-blue-background);
      border-radius: 2rem;
      color: var(--white-background);
      transition: background-color 0.2s ease-in-out,  color 0.2s ease-in-out;
    }

    .login-form__btn:active {
      background-color: var(--light-gray-color);
    }

    .login-form__btn-group {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .login-form__btn:hover {
      background-color: var(--blue-background);
      cursor: pointer;
    }

    .error-messsge {
      color: red;
      margin-top: 0.5rem;
      text-align: center;
    }

    .registration-btn {
      color:  var(--light-blue-background);
      font-weight: bold;
    }

    .registration-btn:hover {
      cursor: pointer;
    }

    .toast {
      display: flex;
      justify-content: center;
    }

    @media screen and (max-width: 600px) {
      .login-form__btn {
          padding: 0.75rem;
          font-size: 1rem;
          min-width: 17rem;
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
        min-width: 15rem;
      }
      .error-messsge{
        margin-top: 0.25rem;
      }
    }
  </style>
  `;
};

export { getLoginComponentStyle };
