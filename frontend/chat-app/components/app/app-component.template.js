import { getAppComponentStyles } from "./app-component.styles";
export function createAppTemplate(user) {
  return `
  ${getAppComponentStyles()}
  <div class="app">
    ${
      user
        ? "<header-component></header-component>"
        : "<auth-component></auth-component>"
    }
  </div>`;
}
