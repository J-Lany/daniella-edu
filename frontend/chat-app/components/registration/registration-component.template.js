import { getRegistrationComponentStyle } from "./registration-component.styles";

export function createRegistrationTemplate(errorMessage) {
  const hasErrorMessage = !!errorMessage;
  const errorMessageClass = hasErrorMessage ? "show" : "";
  return `
  ${getRegistrationComponentStyle()}
  <div class="registration-page">
    <h3>Sign up</h3>
    <div class="registration-form">
      <input id="login" class="registration-form__input" type="text" placeholder="login" required/>
      <input id="password" class="registration-form__input ${
        hasErrorMessage ? "error" : ""
      }" type="password" placeholder="password" required />
      <input id="confirm-password" class="registration-form__input ${
        hasErrorMessage ? "error" : ""
      } type="password" placeholder="confirm password" required />
      <button class="registration-form__btn">Sign up</button>
    </div>
   <div class="error-messsge ${errorMessageClass}">${errorMessage}</div>
  </div>
  `;
}
