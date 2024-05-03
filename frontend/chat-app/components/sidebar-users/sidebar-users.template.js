import { getUsersSidebarStyle } from "./sidebar-users.styles";

export function createUsersSidebarTemplate(users) {
  return `
    ${getUsersSidebarStyle()}
    <div class="chat-sidebar">
    ${
      users
        ? users.map((user) => {
            return `
               <div class="user-info">
                  <avatar-component class="avatar" user-id=${user.userId}></avatar-component>
               <div class="user-info__name">${user.login}</div>
           </div>
          `;
          })
        : "Упс, такого пользователя не существует"
    }
    </div>
`;
}
