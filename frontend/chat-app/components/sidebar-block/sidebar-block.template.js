import { getSidebarBlockStyle } from "./sidebar-block.styles";

export function createSidebarBlockTemplate(list) {
  return `
    ${getSidebarBlockStyle()}
    <div class="chat-sidebar">
    ${
      list
        ? list.map(
            (item) => `<message-info user-id=${item.userId}></umessage-info>`
          )
        : "Упс, тут ничего нет"
    }
    </div>
`;
}
