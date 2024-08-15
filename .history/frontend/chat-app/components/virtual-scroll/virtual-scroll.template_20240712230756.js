import { getVSComponentStyle } from "./virtual-scroll.styles";

export function createVSComponentTemplate() {
  return `
    ${getVSComponentStyle()}
    <slot></slot>
    <div class="container">
    лорлорлорло
      <div class="sub-container"></div>
    </div>
  `;
}
