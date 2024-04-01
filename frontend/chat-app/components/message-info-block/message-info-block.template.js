import { getNessageInfoBlockStyle } from "./message-info-block.styles";

export function createMessageInfoTemplate(user, time) {
  const { lastName, firstName } = user;
  const timeData = time ? time : "11:11";
  return `
    ${getNessageInfoBlockStyle()}
    <div class="message-info">
      <div class="message-info__author">${firstName} ${lastName}</div>
      <div class="message-info__time">${timeData}</div>
   </div>
  `;
}
