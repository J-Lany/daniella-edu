import "../common.css";

export function getChatComponentStyle() {
  return `
  <style>
  @import url('../common.css');
   .chat {
    display: grid;
    padding-left: 5.6rem;
    background-color: var(--light-gray-background);
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "header header"
      "sidebar messages";
    height: 100vh;
    width: 100vw;
  }
  
  header-component {
    grid-area: header;
  }
  
  sidebar-component {
    grid-area: sidebar;
  }
  
  chat-block {
    grid-area: messages;
  }
  
</style>
  `;
}
