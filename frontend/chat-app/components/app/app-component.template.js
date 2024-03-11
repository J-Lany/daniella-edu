import { getAppComponentStyles } from "./app-component.styles";
export function createAppTemplate(user) {
  if (!user) {
    return `<login-component></login-component>`;
  }
  return `
  ${getAppComponentStyles()}
  <div class="app">
    <header-component></header-component>
  </div>`;
}
