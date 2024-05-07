import "../common.css";

export function getSidebarStyle() {
  return `
     <style>
       @import url('../common.css');
       
       .chat-sidebar{
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: var(--light-gray-background);
          padding: 1rem;
       }

       .avatar{
        max-width: 2rem;
        max-height: 2rem;
       }
     </style>
 `;
}
