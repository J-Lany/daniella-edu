export function createAuthComponent(state) {
  return `
  <div>
    ${
      state === "login"
        ? "<login-component></login-component>"
        : "<registration-component></registration-component>"
    }
  </div>
`;
}
