import { getAppComponentStyles } from "./app-component.styles";
export function createAppTemplate(token) {
  return `
  ${getAppComponentStyles()}
  <div class="app">
    ${
      token
        ? "<header-component></header-component>"
        : "<auth-component></auth-component>"
    }
  </div>`;
}
