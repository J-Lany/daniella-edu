import "../common.css";

export function getMessageStyle(position, withAvatar) {
  const marginTop = withAvatar ? "1.5rem" : "0.2rem";
  const alignItems = position === "left" ? "flex-start" : "flex-end";
  const borderRadious =
    position === "left"
      ? "border-radius: 1rem 1rem 1rem 0"
      : "border-radius: 1rem 1rem 0 1rem";

  return `
  <style>
    @import url('../common.css');

    .message-block{
      display: flex;
      gap: 1rem;
      align-items: center;
      font-family: inter;
      font-size: 1rem;
      margin-top: ${marginTop}
    }

    .message-block__body{
      display: flex;
      flex-direction: column;
      align-items: ${alignItems};
      gap: 0.25rem;
      text-align: left;
    }

    .right {
      justify-self: flex-end;
    }

    .message-block__text {
      background-color: var(--white-blue-background);
      ${borderRadious};
      padding: 0.4rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
      
  </style>
 `;
}
