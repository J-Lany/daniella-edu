import { getAvatarStyles } from "./avatar-component.styles";

export function createAvatarTemplate(
  { avatar, login, firstName, lastName },
  displayMode
) {
  const abbreviation =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`
      : `${login[0]}${login[login.length - 1]}`;

  return `
  ${getAvatarStyles(displayMode)}
  <div class="avatar">
  ${
    avatar
      ? `<img class="${displayMode}-avatar__img" src="${avatar}" alt='avatar'/>`
      : `<div class="${displayMode}-avatar__abb avatar__abb">${abbreviation.toUpperCase()}</div>`
  }
  </div>
  `;
}
