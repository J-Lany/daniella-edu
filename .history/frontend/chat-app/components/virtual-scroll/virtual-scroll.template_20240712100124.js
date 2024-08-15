import { getVSComponentStyle } from "./virtual-scroll.styles";

export function createVSComponentTemplate() {
  return `
    ${getVSComponentStyle()}
    <div class="container">
      <div class="block">Еще</div>
    </div>
  `;
}