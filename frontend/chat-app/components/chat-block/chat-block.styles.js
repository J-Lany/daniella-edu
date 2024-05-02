import "../common.css";

export function getChatBlockStyle() {
  return `
  <style>
  @import url('../common.css');
  .chat {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .chat-plus {
    padding: 0.1rem 0.5rem 0.2rem 0.5rem;
    background-color: var(--light-gray-background);
    border-radius: 50%;
    font-size: 2rem;
    color: var(--gray-text-color);
  }
  
</style>
  `;
}
