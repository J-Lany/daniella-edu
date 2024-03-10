export function createAppTemplate(user) {
  if (user) {
    return `
    <div>
      <header-component></header-component>
    </div>`;
  }
  return `<login-component></login-component>`;
}
