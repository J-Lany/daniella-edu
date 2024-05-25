import { getRegistrationComponentStyle } from "./registration-component.styles";

export function createRegistrationTemplate(
  errorMessage,
  login,
  email,
  password,
  confirmPassword
) {
  const hasErrorMessage = !!errorMessage;

  return `
  ${getRegistrationComponentStyle()}
  <div class="registration-page">
    <h3>Sign up</h3>
    <div class="registration-form">
    <div>
      <input id="login" value="${login}" class="registration-form__input" type="text" placeholder="login" required/>
    </div>
    <div>
      <input id="email" value="${email}"  class="registration-form__input" type="text" placeholder="email" required/>
    </div>
    <div>
      <input id="password" value="${password}"  class="registration-form__input ${
    hasErrorMessage ? "error" : ""
  }" type="password" placeholder="password" required />
    </div>
    <div>
      <input id="confirm-password"  value="${confirmPassword}"  class="registration-form__input ${
    hasErrorMessage ? "error" : ""
  }" type="password" placeholder="confirm password" required />
    </div>
    <div class="registration-form__btn-group">
      <button class="registration-form__btn registration-btn">Sign up</button>
      <p> Already have an account?
        <span class="login-btn">Sign in</span>
      </p>
    </div>
    </div>
    ${
      errorMessage
        ? `<toast-component class="toast" type="error" message="${errorMessage}"></toast-component>`
        : ""
    }
  </div>
  `;
}
