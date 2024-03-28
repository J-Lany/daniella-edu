import { getAvatarStyles } from "./avatar-component.styles";
export function createAvatarTemplate(defaultAvatar) {
  return `
  ${getAvatarStyles()}
  <div>
  <img class="avatar" src="${defaultAvatar}" alt='avatar'/>
  </div>
  `;
}
