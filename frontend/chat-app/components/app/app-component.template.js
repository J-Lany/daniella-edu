import { getAppComponentStyles } from "./app-component.styles";
export function createAppTemplate(token) {
  return `
  ${getAppComponentStyles()}
  <div class="app ${token || "auth-container"}">
    ${
      token
        ? "<chat-component></chat-component>"
        : "<auth-component></auth-component>"
    }
  </div>`;
}
