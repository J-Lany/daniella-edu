import { getLoginComponentStyle } from "./login-component.styles";

export function createLoginTemplate() {
  return `
    ${getLoginComponentStyle()}
   <div>
    <h3>Log in</h3>
    <form action="">
      <div class="login-form">
        <input class="login-form__input" type="text" placeholder="login" required/>
        <input class="login-form__input" type="password" placeholder="password" required />
        <div class="login-form__btn-group">
          <button class="login-form__btn">Log in</button>
          <button class="login-form__btn">Sign up</button>
        </div>
      </div>
    </form>
   </div>
  `;
}
