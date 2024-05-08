import { viewTypes } from "./auth-component";
import { getAuthComponentStyle } from "./auth-component.styles";

export function createAuthComponent(viewType, successReg) {
  const successItem = (successReg) => {
    return successReg ? `<div class="success-reg"> ${successReg}</div>` : "";
  };

  return `
  ${getAuthComponentStyle()}
  <div>
    ${
      viewType === viewTypes.LOGIN
        ? `<login-component></login-component> ${successItem(successReg)}`
        : `<registration-component></registration-component>`
    }
  </div>
`;
}
