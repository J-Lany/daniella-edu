import { getVSComponentStyle } from "./virtual-scroll.styles";

export function createVSComponentTemplate(rowHeight) {
  return `
  ${getVSComponentStyle(rowHeight)}
  <div class="container">
    <div class="block"></div>
  </div>
  `;
}
