import { getSidebarBlockStyle } from "./sidebar-block.styles";

export function createSidebarBlockTemplate(list, type) {
  const layoutList = () => {
    return list.map((item) => {
      return `<message-component class="sidebar-block__item" user-id=${item.userId} display-mode="sidebar"></message-component> `;
    });
  };

  return `
    ${getSidebarBlockStyle()}
    <div class="sidebar-block">
      ${list && list.length > 0 ? layoutList().join("") : "Упс, тут ничего нет"}
    </div>
`;
}
