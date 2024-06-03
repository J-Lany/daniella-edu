import { getUserListStyle } from "./user-list.styles";

const layoutList = (list) => {
  return list
    .map(({ userId }) => {
      return `<message-component class="user-list__item" user-id="${userId}" display-mode="sidebar"></message-component> `;
    })
    .join("");
};

export function createUserListTemplate(result) {
  return `
    ${getUserListStyle()}
    <div class="user-list">
      ${
        result && result.length > 0
          ? `<div>Create chat</div>
          ${layoutList(result.usersWithoutConversations)}
            <div>Select chat</div>
            ${layoutList(result.usersWithConversations)}`
          : "<div class='user-list-empty'>Упс, тут ничего нет</div>"
      }
    </div>
`;
}
