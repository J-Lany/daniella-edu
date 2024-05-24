import { getSidebarBlockStyle } from "./sidebar-block.styles";

const layoutList = (list) => {
  return list
    .map((item) => {
      return `<message-component class="sidebar-block__item" user-id=${item.userId} display-mode="sidebar"></message-component> `;
    })
    .join("");
};

export function createSidebarBlockTemplate(list) {
  return `
    ${getSidebarBlockStyle()}
    <div class="sidebar-block">
      ${
        list && list.length > 0
          ? layoutList(list)
          : "<div class='sidebar-empty'>Упс, тут ничего нет</div>"
      }
    </div>
`;
}
