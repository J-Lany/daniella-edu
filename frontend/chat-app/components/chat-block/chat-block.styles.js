import "../common.css";

export function getChatBlockStyle() {
  return `
  <style>
  @import url('../common.css');

  .chat {
    background: var(--white-background);
    height: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .chat-empty {
    text-align: center;
  }

  .chat-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .messages-block {
    flex-grow: 2;
  }
  
  .messages-input {
    flex-grow: 1;
  }
  
</style>
  `;
}
