import { getSidebarBlockStyle } from "./sidebar-block.styles";

export function createSidebarBlockTemplate(list) {
  return `
    ${getSidebarBlockStyle()}
    <div class="sidebar-block">
    ${
      list && list.length > 0
        ? list.map(
            (item) =>
              `<message-info class="sidebar-block__item" user-id=${item.userId}></umessage-info>`
          )
        : "Упс, тут ничего нет"
    }
    </div>
`;
}
