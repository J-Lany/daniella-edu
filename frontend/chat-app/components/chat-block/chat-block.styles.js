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
  
</style>
  `;
}
