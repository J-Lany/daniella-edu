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
    height: 100vh;
    overflow-y: hidden;
  }

  .chat-wrapper {
    display: flex;
    flex-grow: 1; 
    overflow-y: hidden;
  }
  
  .header {
    flex-grow: 1;
  }
  
 .sidebar {
  display: flex;
  justify-content: flex-end;
  }
  
  .chat-block {
    flex-grow: 2;
  }
  
</style>
  `;
}
