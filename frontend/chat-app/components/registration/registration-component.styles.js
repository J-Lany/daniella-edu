import "../common.css";

export const getRegistrationComponentStyle = () => {
  return `
  <style>
  @import url('../common.css');

  @keyframes fadeIn {
    0% {  background: var(--light-gray-background); }
    100% { background-color: var( --red-error-background); }
  }

  .registration-page{
    max-width: 80rem;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  .registration-form {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    padding-bottom: 1rem;
  }

  .registration-form__input {
    font-size: 1rem;
    padding: 1rem;
    min-width: 20rem;
    border: none;
    background: var(--light-gray-background);
    border-radius: 0.5rem;
    box-shadow: inbox 0 0 0.5rem rgba(0, 0, 0, 0.2);
  }

  .registration-form__btn {
    padding: 0.75rem;
    min-width: 22rem;
    font-size: 1rem;
    border: 1px solid var(--light-blue-background);
    background: var(--light-blue-background);
    border-radius: 2rem;
    color: var(--white-background);
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }

  .registration-form__btn:active {
    background-color: var(--light-gray-color);
  }

  .registration-form__btn-group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login-btn {
    color:  var(--light-blue-background);
    font-weight: bold;
  }

  .login-btn:hover {
    cursor: pointer;
  }

  .registration-form__btn:hover {
    background-color: var(--blue-background);
    cursor: pointer;
  }

  .toast {
    display: flex;
    justify-content: center;
  }

  .show {
    display: block;
  }
  

  .error{
    box-shadow: inset 0 0 3px var(--red-error);
    background-color: var( --red-error-background);
    animation: fadeIn 0.5s ease forwards;
  }

  @media screen and (max-width: 600px) {
    .registration-form__btn {
      padding: 0.75rem;
        font-size: 1rem;
        min-width: 17rem;
      }

    .registration-form__input {
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
