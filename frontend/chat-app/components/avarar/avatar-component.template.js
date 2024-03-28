import { getAvatarStyles } from "./avatar-component.styles";

export function createAvatarTemplate({ avatar, login }) {
  const abbreviation = `${login[0]}${login[login.length - 1]}`;
  console.log(getAvatarStyles());
  return `
  ${getAvatarStyles()}
  <div class="avatar">
  ${
    avatar
      ? `<img class="avatar__img" src="${avatar}" alt='avatar'/>`
      : `<div class="avatar__abb">${abbreviation.toUpperCase()}</div>`
  }
  </div>
  `;
}
