import "../common.css";

export function getChatBlockStyle() {
  return `
  <style>
  @import url('../common.css');

  .chat {
    background: var(--white-background);
    height: 100%;
    padding: 1rem;
  }
  .chat-empty {
    text-align: center;
  }

  .chat-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
  `;
}
