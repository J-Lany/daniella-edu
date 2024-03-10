export function createAppTemplate(user) {
  if (!user) {
    return `<login-component></login-component>`;
  }
  return `
  <div>
    <header-component></header-component>
  </div>`;
}
