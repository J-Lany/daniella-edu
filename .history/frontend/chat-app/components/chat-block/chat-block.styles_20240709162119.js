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
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .chat-empty__img {
    max-width: 15rem;
    filter: opacity(0.5);
  }

  .chat-empty__text {
    color: var(--gray-text-color);
    text-align: center;
    font-style: italic;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .chat-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 1rem;
  }

  .messages-block {
    flex-grow: 0;
    height: 100%;
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
  }
  
</style>
  `;
}
