import "../common.css";

export function getChatComponentStyle() {
  return `
  <style>
  @import url('../common.css');
   .chat {
    display: flex;
    flex-direction: column;
    padding-left: 5.6rem;
    background-color: var(--light-gray-background);
  }

  .chat-wrapper {
    display: flex;
  }
  
  .header {
    flex-grow: 1;
  }
  
 .sidebar {
  flex-grow: 1;
  }
  
  .chat-block {
    flex-grow: 3;
  }
  
</style>
  `;
}
