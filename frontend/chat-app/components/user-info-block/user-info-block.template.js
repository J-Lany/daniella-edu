import { getUserInfoBlockComponentStyle } from "./user-info-block.styles";

export function createUserInfoBlockTemplate(props) {
  if (!props) {
    return null;
  }

  const { login, userId } = props;

  return `
  ${getUserInfoBlockComponentStyle()}
  <div class="user-info">
    <avatar-component display-mode="chat" user-id=${userId}></avatar-component>
    <div>
      <div class="user-info__name">${login}</div>
      <div class="user-info__status">active</div>
    </div>
  </div>
  `;
}
