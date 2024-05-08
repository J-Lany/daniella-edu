import "../common.css";

export function getAppComponentStyles() {
  return `
  <style>
    @import url('../common.css');
    .app {
      margin: 0 auto;
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      width: 100vw;
      display: flex;  
    }

 .auth-container {
  align-items: center;
  justify-content: center;
 }
  </style>
  `;
}
