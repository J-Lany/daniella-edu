import { getSidebarBlockStyle } from "./sidebar-block.styles";

const getCompanionId = (participantsIds, currentUserId) => {
  return participantsIds
    .filter((partisipantId) => partisipantId !== currentUserId)
    .join(",");
};

const layoutList = (list, currentUserId) => {
  return list
    .map(({ participantsIds }) => {
      const companionId = getCompanionId(participantsIds, currentUserId);
      return `<message-component class="sidebar-block__item" user-id="${companionId}" display-mode="sidebar"></message-component> `;
    })
    .join("");
};

export function createSidebarBlockTemplate(chatList, currentUserId) {
  return `
    ${getSidebarBlockStyle()}
    <div class="sidebar-block">
      ${
        chatList && chatList.length > 0
          ? layoutList(chatList, currentUserId)
          : "<div class='sidebar-empty'>Упс, тут ничего нет</div>"
      }
    </div>
`;
}
