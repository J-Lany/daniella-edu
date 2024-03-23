import { viewTypes } from "./auth-component";

export function createAuthComponent(viewType) {
  return `
  <div>
    ${
      viewType === viewTypes.LOGIN
        ? "<login-component></login-component>"
        : "<registration-component></registration-component>"
    }
  </div>
`;
}
