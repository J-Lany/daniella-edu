import { viewTypes } from "./auth-component";

export function createAuthComponent(state) {
  return `
  <div>
    ${
      state === viewTypes.LOGIN
        ? "<login-component></login-component>"
        : "<registration-component></registration-component>"
    }
  </div>
`;
}
