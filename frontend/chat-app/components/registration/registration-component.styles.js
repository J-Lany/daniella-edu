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
    font-size: 1.5rem;
    padding: 1rem;
    border: none;
    background: var(--light-gray-background);
    border-radius: 0.5rem;
  }

  .registration-form__btn {
    padding: 0.7rem 7.3rem;
    font-size: 1rem;
    border: 1px solid var(--light-gray-background);
    border-radius: 0.3rem;
    color: var(--gray-text-color);
    background-color: var(--light-green-background);
    box-shadow: 0 1px 3px var(--light-gray-background);
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
        padding: 0.75rem 3.5rem;
        font-size: 1rem;
        width: auto;
      }

    .registration-form__input {
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
