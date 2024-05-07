import { getNessageInfoBlockStyle } from "./message-info-block.styles";

export function createMessageInfoTemplate(user, time) {
  console.log(time);
  const currentUser =
    user.lastName && user.firstName
      ? `${user.lastName} ${user.firstName}`
      : user.login;

  return `
    ${getNessageInfoBlockStyle()}
    <div class="message-info">
      <div class="message-info__author">${currentUser}</div>
     ${time ? `<div class="message-info__time">${time}</div>` : ""}
   </div>
  `;
}
