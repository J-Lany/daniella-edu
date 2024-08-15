import { getVSComponentStyle } from "./virtual-scroll.styles";

export function createVSComponentTemplate() {
  return `
    ${getVSComponentStyle()}
    <slot></slot>
    <div class="container">
    </div>
  `;
}
