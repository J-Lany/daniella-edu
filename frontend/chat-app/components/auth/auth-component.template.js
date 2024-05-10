import { viewTypes } from "./auth-component";
import { getAuthComponentStyle } from "./auth-component.styles";

const successRegText = "Вы успешно зарегестрированы";

export function createAuthComponent(viewType, successReg) {
  const successItem = (successReg) => {
    return successReg
      ? `<toast-component type="sucsess" message="${successRegText}"></toast-component>`
      : "";
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
