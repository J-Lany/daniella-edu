import { getSidebarBlockStyle } from "./sidebar-block.styles";

const layoutList = (list) => {
  return list
    .map(({ participantsIds }) => {
      return `<message-component class="sidebar-block__item" user-id=${participantsIds[0]} display-mode="sidebar"></message-component> `;
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
