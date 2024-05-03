import { getUsersSidebarStyle } from "./sidebar-users.styles";

export function createUsersSidebarTemplate(users) {
  if (!users) {
    return null;
  }
  console.log(users);
  return `
    ${getUsersSidebarStyle()}
    <div class="chat-sidebar">
    ${users.map((user) => {
      return `
               <div class="user-info">
                  <avatar-component class="avatar" user-id=${user.userId}></avatar-component>
               <div class="user-info__name">${user.login}</div>
           </div>
          `;
    })}
    </div>
`;
}
