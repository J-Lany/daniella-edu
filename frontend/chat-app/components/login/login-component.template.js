import { getLoginComponentStyle } from "./login-component.styles";

export function createLoginTemplate(errorMessage) {
  return `
    ${getLoginComponentStyle()}
   <div class="login-page">
    <h3>Log in</h3>
      <div class="login-form">
        <input id="login" class="login-form__input" type="text" placeholder="login" required/>
        <input id="password" class="login-form__input" type="password" placeholder="password" required />
        <div class="login-form__btn-group">
          <button class="login-form__btn login-btn">Log in</button>
          <button class="login-form__btn registration-btn">Sign up</button>
        </div>
      </div>
      ${errorMessage ? `<div class="error-messsge">${errorMessage}</div>` : ""}
   </div>
  `;
}
