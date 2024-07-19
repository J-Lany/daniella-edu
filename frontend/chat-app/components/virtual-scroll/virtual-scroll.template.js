import { getVSComponentStyle } from "./virtual-scroll.styles";

export function createVSComponentTemplate() {
  return `
    ${getVSComponentStyle()}
    <div class="content"></div>
    <div class="bottom-placeholder placeholder"></div>
  `;
}
