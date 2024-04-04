import "../common.css";

export function getChatComponentStyle() {
  return `
  <style>
  @import url('../common.css');
   .chat {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "header header"
      "sidebar messages";
    height: 100%;
    gap: 1rem;
  }
  
  header-component {
    grid-area: header;
  }
  
  message-sidebar {
    grid-area: sidebar;
  }
  
  messages-block {
    grid-area: messages;
  }
  
</style>
  `;
}
