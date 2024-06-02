import { getUserListStyle } from "./user-list.styles";

const layoutList = (userList) => {
  return userList
    .map(({ userId }) => {
      return `<message-component class="user-list__item" user-id="${userId}" display-mode="sidebar"></message-component> `;
    })
    .join("");
};

export function createUserListTemplate(userList) {
  return `
    ${getUserListStyle()}
    <div class="user-list">
      ${
        userList && userList.length > 0
          ? layoutList(userList)
          : "<div class='user-list-empty'>Упс, тут ничего нет</div>"
      }
    </div>
`;
}
