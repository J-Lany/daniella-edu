import "../common.css";

export function getMessageStyle(displayMode) {
  const sizesByMode = {
    fontSize: displayMode == "sidebar" ? "0.75rem" : "1rem",
    gap: displayMode == "sidebar" ? "1rem" : "0.25rem",
  };

  return `
  <style>
    @import url('../common.css');

    .message-block{
      display: flex;
      gap: 1rem;
      align-items: center;
      font-family: inter;
      font-size: ${sizesByMode.fontSize};
    }
      
    .message-block__body{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: ${sizesByMode.gap};
      text-align: left;
    }
  </style>
 `;
}
