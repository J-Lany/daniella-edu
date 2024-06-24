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
    display: grid;
    gap: 1rem;
    padding-bottom: 1rem;
  }

  .messages-block {
    flex-grow: 0;
    overflow: auto;
    scrollbar-width: none;
    padding-left: 1rem;
    padding-right: 5.6rem;
  }
  
  .messages-input {
    flex-grow: 1;
    margin-bottom: 1rem;
    padding-right: 5.6rem;
    background-color: var(--light-gray-background);
    max-height: 5.2rem;
    align-self: flex-end;
  }
  
</style>
  `;
}
