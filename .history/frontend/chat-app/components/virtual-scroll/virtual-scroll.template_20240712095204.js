import { getVSComponentStyle } from "./virtual-scroll.styles";

export function createVSComponentTemplate(rowHeight) {
  return `
  ${getVSComponentStyle()}
  <div class="container">
    <div class="blobk"></div>
  </div>
  `;
}
