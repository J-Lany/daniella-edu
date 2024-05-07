import { LIST_TYPE } from "../sidebar/sidebar";
import { getSidebarBlockStyle } from "./sidebar-block.styles";

export function createSidebarBlockTemplate(list, type) {
  const layoutList = () => {
    return list.map((item) => {
      return `<message-info class="sidebar-block__item" user-id=${item.userId}></message-info> `;
    });
  };

  return `
    ${getSidebarBlockStyle()}
    <div class="sidebar-block">
      ${list && list.length > 0 ? layoutList().join("") : "Упс, тут ничего нет"}
    </div>
`;
}
