import { getAvatarStyles } from "./avatar-component.styles";

export function createAvatarTemplate(user, displayMode) {
  const abbreviation =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : `${user?.login[0]}${user?.login[user?.login.length - 1]}`;

  return `
  ${getAvatarStyles(displayMode)}
  <div class="avatar">
  ${
    user?.avatar
      ? `<img class="${displayMode}-avatar__img" src="${user.avatar}" alt='avatar'/>`
      : `<div class="${displayMode}-avatar__abb avatar__abb">${abbreviation.toUpperCase()}</div>`
  }
  <div class="dot ${user?.status}"></div>
  </div>
  `;
}
