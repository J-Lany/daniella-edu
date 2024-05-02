import "../common.css";

export const getRegistrationComponentStyle = () => {
  return `
  <style>
  @import url('../common.css');

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
  }

  .registration-form__input {
    font-size: 1rem;
    padding: 1rem;
    min-width: 20rem;
    border: none;
    background: var(--light-gray-background);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  }

  .registration-form__btn {
    padding: 0.75rem;
    min-width: 22rem;
    font-size: 1rem;
    border: 1px solid var(--light-gray-background);
    border-radius: 2rem;
    color: var(--gray-text-color);
    transition: background-color 0.5s ease-in-out;
  }

  .registration-form__btn:active {
    background-color: var(--light-gray-color);
  }

  .registration-form__btn:hover {
    background-color: var(--light-blue-background)
  }

  .error-messsge {
    color: red;
    margin-top: 1rem;
    text-align: center;
    display: none;
  }

  .show {
    display: block;
  }
  

  .error{
    background-color: var( --red-error-background)
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
