export function getAppComponentStyles() {
  return `
  <style>
    @import url('../common.css');
    .app {
      max-width: 80rem;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    }
  </style>
  `
}