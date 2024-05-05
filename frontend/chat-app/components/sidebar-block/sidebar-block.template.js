import { LIST_TYPE } from "../sidebar/sidebar";
import { getSidebarBlockStyle } from "./sidebar-block.styles";

export function createSidebarBlockTemplate(list, type) {
  return `
    ${getSidebarBlockStyle()}
    <div class="sidebar-block">
    ${type === LIST_TYPE.users ? `<div class="close-button">x</div>` : ""}
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
