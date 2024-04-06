import "../common.css";

export function getChatSidebarStyle() {
  return `
     <style>
       @import url('../common.css');
       
       .chat-sidebar{
        background: var(--light-gray-background);
       }
     </style>
 `;
}
