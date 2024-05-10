import { getRegistrationComponentStyle } from "./registration-component.styles";

export function createRegistrationTemplate(errorMessage) {
  console.log(errorMessage);
  const hasErrorMessage = !!errorMessage;
  const errorMessageClass = hasErrorMessage ? "show" : "";
  return `
  ${getRegistrationComponentStyle()}
  <div class="registration-page">
    <h3>Sign up</h3>
    <div class="registration-form">
    <div>
      <input id="login" class="registration-form__input" type="text" placeholder="login" required/>
    </div>
    <div>
      <input id="email" class="registration-form__input" type="text" placeholder="email" required/>
    </div>
    <div>
      <input id="password" class="registration-form__input ${
        hasErrorMessage ? "error" : ""
      }" type="password" placeholder="password" required />
    </div>
    <div>
      <input id="confirm-password" class="registration-form__input ${
        hasErrorMessage ? "error" : ""
      }" type="password" placeholder="confirm password" required />
    </div>
      <div><button class="registration-form__btn">Sign up</button></div>
    </div>
    ${
      errorMessage
        ? `<toast-component type="error" message="${errorMessage}"></toast-component>`
        : ""
    }
  </div>
  `;
}
