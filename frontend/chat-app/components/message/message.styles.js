import "../common.css";

export function getMessageStyle(displayMode, position) {
  const sizesByMode = {
    fontSize: displayMode == "sidebar" ? "0.75rem" : "1rem",
    gap: displayMode == "sidebar" ? "1rem" : "0.25rem",
    alignItems: position === "left" ? "flex-start" : "flex-end",
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
      align-items: ${sizesByMode.alignItems};
      gap: ${sizesByMode.gap};
      text-align: left;
    }

    .right {
      justify-self: flex-end;
    }
      
  </style>
 `;
}
