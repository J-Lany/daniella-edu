import { getNessageInfoBlockStyle } from "./message-info-block.styles";

export function createMessageInfoTemplate(user, time) {
  const currentUser =
    user.lastName && user.firstName
      ? `${user.lastName} ${user.firstName}`
      : user.login;
  const timeData = time || "unkown time";

  return `
    ${getNessageInfoBlockStyle()}
    <div class="message-info">
      <div class="message-info__author">${currentUser}</div>
      <div class="message-info__time">${timeData}</div>
   </div>
  `;
}
