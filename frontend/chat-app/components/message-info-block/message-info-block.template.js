import { getNessageInfoBlockStyle } from "./message-info-block.styles";

export function createMessageInfoTemplate(info) {
  const authorData = info ? info.autor : "Dani";
  const timeData = info ? info.time : "11:11";
  return `
    ${getNessageInfoBlockStyle()}
    <div class="message-info">
      <div class="message-info__author">${authorData}</div>
      <div class="message-info__time">${timeData}</div>
   </div>
  `;
}
