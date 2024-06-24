import { getMessageInfoBlockStyle } from "./message-info-block.styles";

const UNDEFINED = "undefined";
export function createMessageInfoTemplate(user, time, position) {
  const currentUser =
    user.lastName && user.firstName
      ? `${user.lastName} ${user.firstName}`
      : user.login;

  const timeItem =
    time !== UNDEFINED ? `<div class="message-info__time">${time}</div>` : "";
  const authorItem = `<div class="message-info__author">${currentUser}</div>`;

  const createLayout = (authorItem, timeItem, position) =>
    position === "left"
      ? `${authorItem}${timeItem}`
      : `${timeItem}${authorItem}`;

  return `
    ${getMessageInfoBlockStyle()}
    <div class="message-info">
       ${createLayout(authorItem, timeItem, position)}
   </div>
  `;
}
