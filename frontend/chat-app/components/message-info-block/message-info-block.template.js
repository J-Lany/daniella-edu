import { getMessageInfoBlockStyle } from "./message-info-block.styles";

export function createMessageInfoTemplate(user, time, position) {
  const currentUser =
    user.lastName && user.firstName
      ? `${user.lastName} ${user.firstName}`
      : user.login;

  const timeItem =
    time !== "undefined" ? `<div class="message-info__time">${time}</div>` : "";
  const authorItem = `<div class="message-info__author">${currentUser}</div>`;

  const createLayout = () => {
    if (position === "left") {
      return `${authorItem}${timeItem}`;
    } else {
      return `${timeItem}${authorItem}`;
    }
  };

  return `
    ${getMessageInfoBlockStyle()}
    <div class="message-info">
       ${createLayout()}
   </div>
  `;
}
