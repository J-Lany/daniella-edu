import { getMessageInfoBlockStyle } from "./message-info-block.styles";

export function createMessageInfoTemplate(user, time) {
  const currentUser =
    user.lastName && user.firstName
      ? `${user.lastName} ${user.firstName}`
      : user.login;

  return `
    ${getMessageInfoBlockStyle()}
    <div class="message-info">
      <div class="message-info__author">${currentUser}</div>
     ${
       time !== "undefined"
         ? `<div class="message-info__time">${time}</div>`
         : ""
     }
   </div>
  `;
}
