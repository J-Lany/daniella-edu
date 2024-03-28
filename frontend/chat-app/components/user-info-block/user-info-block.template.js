import { getUserInfoBlockComponentStyle } from "./user-info-block.styles";

export function createUserInfoBlockTemplate(props) {
  if (!props) {
    return null;
  }
  const { login } = props;
  return `
  ${getUserInfoBlockComponentStyle()}
  <div class="user-info">
    <avatar-component></avatar-component>
    <div>
      <div class="user-info__name">${login}</div>
      <div class="user-info__status">active</div>
    </div>
  </div>
  `;
}
