import { getLoginComponentStyle } from "./login-component.styles";

export function createLoginTemplate(errorMessage) {
  return `
    ${getLoginComponentStyle()}
   <div class="login-page">
    <h3>Log in</h3>
      <div class="login-form">
        <div>
          <input id="email" class="login-form__input" type="text" placeholder="email" required/>
        </div>
        <div>
          <input id="password" class="login-form__input" type="password" placeholder="password" required />
        </div>
        <div class="login-form__btn-group">
          <button class="login-form__btn login-btn">Log in</button>
          <p>Don't have an account?
          <span class="registration-btn">Sign up</span></p>
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
